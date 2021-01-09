import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  _data: any = { id: 123, descricao: 'Pedido 123' };

  constructor(private el: ElementRef<HTMLElement>) { }

  get data() {
    return JSON.stringify(this._data);
  }

  get width() {
    return this.el.nativeElement.offsetWidth ?? 256;
  }

}
