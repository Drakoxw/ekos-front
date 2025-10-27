import { inject, Injectable, signal } from '@angular/core';
import { ProductRequestService } from './product-request.service';
import { Pagination } from '@interfaces/index';
import { map } from 'rxjs';
import { CategoryStore } from '@store/categories.store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiService = inject(ProductRequestService)
  private categoryStore = inject(CategoryStore);

  sendAlert = signal<{ type: 'success' | 'error', msg: string }>({
    type: 'success',
    msg: ''
  })

  getProduct(id: number) {
    return this.apiService.get(id);
  }

  page(payload: Pagination) {
    return this.apiService.page(payload);
  }

  createProduct(payload: any) {
    return this.apiService.create(payload).pipe(map((r) => {
      this.sendAlert.set({
        type: r.error ? 'error' : 'success',
        msg: r.msg
      });
      return r
    }));
  }

  deleteProduct(id: number) {
    return this.apiService.delete(id).pipe(map((r) => {
      this.sendAlert.set({
        type: r.error ? 'error' : 'success',
        msg: r.msg
      });
      return r
    }));
  }

  updateProduct(id: number, payload: any) {
    return this.apiService.update(id, payload).pipe(map((r) => {
      this.sendAlert.set({
        type: r.error ? 'error' : 'success',
        msg: r.msg
      });
      return r
    }));
  }

  loadCategories() {
    this.categoryStore.isLoading()
    this.apiService.listCategories().subscribe({
      next: (res) => {
        if (!res.error && res.data) {
          this.categoryStore.update(res.data)
        }
      }
    });
  }

}
