import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { GetUnitsService } from '../../services/get-units.service';
import { Locations } from '../../types/locations.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  // Sinaliza para o parent que houve um 'submit' no formulário
  @Output() submitEvent = new EventEmitter();
  results: Locations[] = [];
  filteredResults: Locations[] = [];
  formGroup!: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private unitsService: GetUnitsService,
    private filterUnitsService: FilterUnitsService)
  {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });

    // Quando o valor do getAllUnits for alterado, esse callback será chamado
    this.unitsService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filteredResults = data;
    });
  }

  onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value;
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitsService.setFilteredUnits(this.filteredResults);

    // Emite que o usuario enviou o form
    this.submitEvent.emit();
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
