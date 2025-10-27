import { Component, effect, EventEmitter, input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { PageData, Pagination, ProductData } from '@interfaces/index';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [TableModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule]
})
export class TableComponent {
  @Output() tableChange = new EventEmitter<Pagination>()
  @Output() deleteItem = new EventEmitter<number>()
  @Output() editItem = new EventEmitter<number>()
  @Output() newItem = new EventEmitter<void>()

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

  constructor() {
    effect(() => {
      this.totalRecords = this.table().totalItems
      if (this.table().pageSize != this.rowSize) {
        this.rowSize = this.table().pageSize || this.rowSize
      }
      this.loadingTable = false
    })
  }

  async loadTable(lazyTable: TableLazyLoadEvent = {}): Promise<void> {
    try {
      this.loadingTable = true
      const filterTable = this.prepareTableParams(lazyTable)
      this.tableChange.emit(filterTable)
    } catch (error) {
      this.loadingTable = false
    }
  }


  private prepareTableParams(
    lazyTable: TableLazyLoadEvent
  ) {
    const rowSize = lazyTable.rows ?? this.rowSize
    const currentPage = lazyTable.first
      ? Math.floor(lazyTable.first / this.rowSize)
      : 0

    const page: Pagination = {
      page: currentPage + 1,
      pageSize: rowSize,
      search: String(lazyTable.globalFilter ?? ''),
    }
    return page
  }


}
