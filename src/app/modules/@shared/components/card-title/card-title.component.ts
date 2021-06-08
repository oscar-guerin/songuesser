import { Component, Input } from '@angular/core';

@Component({
  selector: 'sgr-card-title',
  templateUrl: 'card-title.component.html'
})
export class CardTitleComponent {

  @Input()
  public icon: string;

  @Input()
  public cardTitle: string;

}
