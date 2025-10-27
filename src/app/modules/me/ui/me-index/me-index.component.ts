import { Component, inject } from '@angular/core';
import { AppStore } from '@store/app.store';

@Component({
  selector: 'app-me-index',
  templateUrl: './me-index.component.html',
})
export default class MeIndexComponent {
  linkWhastapp = '';
  linkLinkedin = '';
  linkGithub = '';
  name = '';
  role = '';

  readonly appStore = inject(AppStore);

  constructor() {
    this.linkWhastapp = this.appStore.whastapp();
    this.linkLinkedin = this.appStore.linkedin();
    this.linkGithub = this.appStore.github();
    this.name = this.appStore.fullName();
    this.role = this.appStore.role();
  }

}
