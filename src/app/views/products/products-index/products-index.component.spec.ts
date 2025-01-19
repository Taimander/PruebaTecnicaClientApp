import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsIndexComponent } from './products-index.component';

describe('ProductsIndexComponent', () => {
  let component: ProductsIndexComponent;
  let fixture: ComponentFixture<ProductsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
