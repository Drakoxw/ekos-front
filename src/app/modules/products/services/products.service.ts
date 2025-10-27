import { inject, Injectable, signal } from '@angular/core';
import { ProductRequestService } from './product-request.service';
import { Category, Pagination } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiService = inject(ProductRequestService)

  categories = signal<Category[]>([])

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
    return this.apiService.create(payload);
  }

  deleteProduct(id: number) {
    return this.apiService.delete(id);
  }

  updateProduct(id: number, payload: any) {
    return this.apiService.update(id, payload);
  }

  loadCategories() {
    this.apiService.listCategories().subscribe({
      next: (res) => {
        if (!res.error && res.data) {
          this.categories.set(res.data)
        }
      }
    });
  }

}
