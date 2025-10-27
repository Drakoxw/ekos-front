import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProductsIndexComponent from './products-index.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductsIndexComponent', () => {
  let component: ProductsIndexComponent;
  let fixture: ComponentFixture<ProductsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsIndexComponent],
      providers: [
        MessageService,
        ConfirmationService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting()
      ]
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
