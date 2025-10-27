import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';

import { Pagination, PageData, PageResponse, ProductData, ResponseBase, Category } from '@interfaces/index';
import { URL_API_BASE } from '@constants/index';
import { httpErrorHandler } from '@shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {

  private http = inject(HttpClient)

  page(payload: Pagination): Observable<{
    error: boolean;
    msg: string;
    data?: PageData<ProductData>;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as PageData<ProductData> | undefined };
    return this.http.post<PageResponse<ProductData>>(`${URL_API_BASE}/products/page`, payload).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

  get(id: number): Observable<{
    error: boolean;
    msg: string;
    data?: ProductData;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as ProductData | undefined };
    return this.http.get<ResponseBase<ProductData>>(
      `${URL_API_BASE}/products/${id}`,
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

  create(payload: ProductData): Observable<{
    error: boolean;
    msg: string;
    data?: ProductData;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as ProductData | undefined };
    return this.http.post<ResponseBase<ProductData>>(
      `${URL_API_BASE}/products`,
      payload,
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

  update(id: number, payload: ProductData): Observable<{
    error: boolean;
    msg: string;
    data?: ProductData;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as ProductData | undefined };
    return this.http.put<ResponseBase<ProductData>>(
      `${URL_API_BASE}/products/${id}`,
      payload,
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

  delete(id: number): Observable<{
    error: boolean;
    msg: string;
  }> {
    const res = { error: true, msg: 'Error inesperado' };
    return this.http.delete<ResponseBase<null>>(
      `${URL_API_BASE}/products/${id}`,
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

  listCategories(): Observable<{
    error: boolean;
    msg: string;
    data?: Category[];
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as Category[] | undefined };
    return this.http.get<ResponseBase<Category[]>>(
      `${URL_API_BASE}/categories`,
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

}
