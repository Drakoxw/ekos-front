import { Component, effect, EventEmitter, input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

import { Category, PageData, Pagination, PaginationParams, ProductData } from '@interfaces/index';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [
    TableModule,
    SelectModule,
    FormsModule,
    CurrencyPipe,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule
  ]
})
export class TableComponent {
  @Output() tableChange = new EventEmitter<Pagination>()
  @Output() deleteItem = new EventEmitter<number>()
  @Output() editItem = new EventEmitter<number>()
  @Output() newItem = new EventEmitter<void>()

  categoriesData = input<{ loading: boolean, data: Category[] }>({ loading: true, data: [] })

  table = input<PageData<ProductData>>({
    items: [],
    totalItems: 0,
    page: 10,
    pageSize: 3
  });
  first = 0;
  rowSize = 3
  loadingTable: boolean = false;
  totalRecords = 0
  search = ''
  category = ''

  constructor() {
    effect(() => {
      this.totalRecords = this.table().totalItems
      if (this.table().pageSize != this.rowSize) {
        this.rowSize = this.table().pageSize || this.rowSize
      }
      this.loadingTable = false
    })
  }

  async loadTable(lazyTable: TableLazyLoadEvent = {}, category: string | null = null): Promise<void> {
    try {
      this.loadingTable = true
      const filterTable = this.prepareTableParams(lazyTable, category)
      this.tableChange.emit(filterTable)
    } catch (error) {
      this.loadingTable = false
    }
  }


  private prepareTableParams(
    lazyTable: TableLazyLoadEvent,
    category: string | null = null
  ) {
    const rowSize = lazyTable.rows ?? this.rowSize
    const currentPage = lazyTable.first
      ? Math.floor(lazyTable.first / this.rowSize)
      : 0

    const page: PaginationParams<{ category: string }> = {
      page: currentPage + 1,
      pageSize: rowSize,
      search: String(lazyTable.globalFilter ?? this.search),
    }
    if (category || this.category) {
      page.params = { category: category || this.category }
    }
    return page
  }

}
