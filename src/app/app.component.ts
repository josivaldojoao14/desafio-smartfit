import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from './components/forms/forms.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Locations } from './types/locations.interface';
import { GetUnitsService } from './services/get-units.service';
import { CardComponent } from './components/card/card.component';
import { CaptionComponent } from './components/caption/caption.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FormsComponent,
    CardsListComponent,
    CardComponent,
    CaptionComponent,
    FooterComponent
  ]
})
export class AppComponent {
  // Seta a prop 'showList' para BehaviorSubject (logo, qualquer mudança de valor é 'ouvida')
  showList = new BehaviorSubject(false);

  // Seta a lista de unidades filtradas que será compartilhada com o componente filho 'cards-list'
  unitsList: Locations[] = [];

  constructor(private unitService: GetUnitsService) {}

  // Recebe do componente filho (forms) o aviso do submit
  onSubmit() {
    this.unitsList = this.unitService.getFilteredUnits(); // Recebe as unidades filtradas do serviço
    this.showList.next(true); // Muda o valor de showList para o 'next' valor
  }
}
