import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateProduct } from '@interfaces/index';
import { ProductsService } from '@products-module/services/products.service';
import { FormControlErrorPipe } from '@shared/pipes';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-create-update-modal',
  templateUrl: './create-update-modal.component.html',
  styleUrls: ['./create-update-modal.component.scss'],
  imports: [
    NgTemplateOutlet,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    FormControlErrorPipe,
    CheckboxModule,
    ToggleSwitchModule,
    SelectModule,
    TextareaModule
  ]
})
export class CreateUpdateModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() savedData = new EventEmitter();
  @Input() show: boolean = false;
  @Input() id: number | null = null;

  readonly service = inject(ProductsService);

  form!: FormGroup;
  loading = false

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
    this.loadForm()
    this.service.loadCategories()
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null],
      category: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      isAvailable: [null],
    });
  }

  loadForm() {
    if (this.id) {
      this.service.getProduct(this.id).subscribe(({ error, data }) => {
        console.log({ error, data });

        if (!error && data) {
          this.form.patchValue({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock || 0,
            category: data.category,
            isAvailable: data.isAvailable
          })
        }
      })
    }
  }

  saveForm() {
    if (this.loading) return

    if (this.form.valid) {
      this.loading = true
      const name = this.form.get('name')?.value;
      const description = this.form.get('description')?.value;
      const price = this.form.get('price')?.value;
      const stock = this.form.get('stock')?.value;
      const category = this.form.get('category')?.value;
      const isAvailable = this.form.get('isAvailable')?.value;

      const payload: UpdateProduct = {
        name,
        description,
        price,
        stock,
        category,
        isAvailable,
      }

      const request = this.id ? this.service.updateProduct(this.id, payload) : this.service.createProduct(payload)

      request.subscribe({
        next: (res) => {
          this.loading = false
          if (!res.error) {
            this.closeModal.emit()
            this.savedData.emit()
          }
        },
        error: (err) => {
          this.loading = false
          console.log(err)
        }
      })

    }
  }

}
