import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] // Modificado para 'styleUrls' e como um array
})
export class CardComponent {
  @Input() letter: string = '';
  @Input() isFlipped: boolean = false;  
}
