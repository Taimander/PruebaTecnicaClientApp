import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  invalidCredentials: boolean = false;
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.isError = false;
    this.form.markAllAsTouched(); // Mark all fields as touched to show errors
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res['token']);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.log(err);
        if (err.status === 401) {
          this.invalidCredentials = true;
        }else {
          this.isError = true;
        }
        
      }
    });
  }

}
