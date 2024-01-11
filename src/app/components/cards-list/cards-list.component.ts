import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Locations } from '../../types/locations.interface';
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'app-cards-list',
    standalone: true,
    templateUrl: './cards-list.component.html',
    styleUrl: './cards-list.component.scss',
    imports: [CommonModule, CardComponent]
})
export class CardsListComponent implements OnInit {
  // Recebe a lista de unidades do parent 'app.component'
  @Input() unitsList: Locations[] = [];

  constructor() {}

  ngOnInit(): void {}
}
