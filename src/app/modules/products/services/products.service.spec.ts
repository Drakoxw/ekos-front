
import { TestBed, inject } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: Products', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting()
      ]
    });
  });

  it('should ...', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));
});
