import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    data: {
      slug: 'index',
    },
    loadComponent: () =>
      import('@products-module/ui/products-index/products-index.component'),
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export default class ProductsRoutingModule { }
