import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
  imports: [MessageModule]
})
export default class HomeIndexComponent {}
