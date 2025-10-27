import { Component, effect, inject, OnInit, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PageData, Pagination, ProductData } from '@interfaces/index';
import { ProductsService } from '@products-module/services/products.service';

import { COMPONENT_LIST } from '../components';
import { CategoryStore } from '@store/index';

@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.scss'],
  imports: [
    ...COMPONENT_LIST,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
  ]
})
export default class ProductsIndexComponent implements OnInit {
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  readonly service = inject(ProductsService);
  readonly categoryStore = inject(CategoryStore);

  table = signal<PageData<ProductData>>({
    items: [],
    totalItems: 0,
    page: 0,
    pageSize: 0
  });

  pagination: Pagination = {
    page: 1,
    pageSize: 3,
    search: ''
  }

  showModal = false
  itemId: number | null = null

  constructor() {
    effect(() => {
      const alert =this.service.sendAlert()
      this.messageService.add({
        severity: alert.type,
        summary: 'Alerta',
        detail: alert.msg
      })
    })
  }
  ngOnInit(): void {
    this.service.loadCategories()
  }

  onTableChange(event: Pagination) {
    this.pagination = event
    this.service.page(event).subscribe(r => {
      if (!r.error && r.data) {
        this.table.set(r.data);
      }
    });
  }

  reloadTable() {
    this.service.page(this.pagination).subscribe(r => {
      if (!r.error && r.data) {
        this.table.set(r.data);
      }
    });
  }

  toggleModal(value: boolean, id: number | null = null) {
    this.showModal = value
    this.itemId = id
  }


  onDeleteItem(ev: number) {
    this.confirmationService.confirm({
      message: '¿Desea borrar este elemento?',
      header: `Eliminar el Producto #${ev}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Confirmar',
      accept: () => {
        this.service.deleteProduct(ev).subscribe(r => {
          if (!r.error) {
            this.reloadTable()
          }
        })
      },
    });
  }

  get categoriesData() {
    return { loading: this.categoryStore.isLoading(), data: this.categoryStore.categories() }
  }
}
