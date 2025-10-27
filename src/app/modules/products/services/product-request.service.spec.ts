import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { ProductRequestService } from './product-request.service';
import { URL_API_BASE } from '@constants/index';
import { Pagination, PageResponse, ProductData, PageData } from '@interfaces/index';
import { MOCK_PAGINATION, MOCK_PRODUCT } from '@mocks/index';

describe('ProductRequestService', () => {
  let service: ProductRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductRequestService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProductRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data when API responds with success=true', () => {
    const mockPayload: Pagination = { page: 1, pageSize: 10, search: '' };
    const mockResponse: PageResponse<ProductData> = {
      success: true,
      message: 'OK',
      data: {
        items: [MOCK_PRODUCT],
        totalItems: 1,
        page: 1,
        pageSize: 10,
      } as PageData<ProductData>,
    };

    service.page(mockPayload).subscribe((result) => {
      expect(result.error).toBeFalse();
      expect(result.msg).toBe('OK');
      expect(result.data?.items.length).toBe(1);
    });

    const req = httpMock.expectOne(`${URL_API_BASE}/products/page`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return error=true when API responds with success=false', () => {
    const mockPayload = { ...MOCK_PAGINATION };
    const mockResponse: PageResponse<ProductData> = {
      success: false,
      message: 'Failed',
      data: {} as PageData<ProductData>,
    };

    service.page(mockPayload).subscribe((result) => {
      expect(result.error).toBeTrue();
      expect(result.msg).toBe('Failed');
      expect(result.data).toBeUndefined();
    });

    const req = httpMock.expectOne(`${URL_API_BASE}/products/page`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle HTTP error correctly', () => {
    const mockPayload = { ...MOCK_PAGINATION };

    service.page(mockPayload).subscribe((result) => {
      expect(result.error).toBeTrue();
      expect(result.msg).toContain('Error'); // depende del mensaje de tu httpErrorHandler
    });

    const req = httpMock.expectOne(`${URL_API_BASE}/products/page`);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
