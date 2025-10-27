import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProductsIndexComponent from './products-index.component';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('ProductsIndexComponent', () => {
  let component: ProductsIndexComponent;
  let fixture: ComponentFixture<ProductsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsIndexComponent],
      providers: [MessageService, ConfirmationService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
