import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Locations } from '../types/locations.interface';

// O injectable 'root' funciona igual um Singleton, podemos compartilhar os dados desse serviço para diversos comps e manter os valores
@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  private readonly apiUrl: string = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  // BehaviorService observa o estado e quaisquer alterações
  private allUnitsSubject: BehaviorSubject<Locations[]> = new BehaviorSubject<Locations[]>([]);
  // O cifrão é usado para designar as propriedades que são do tipo Observable
  private allUnits$: Observable<Locations[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Locations[] = [];

  constructor(private http: HttpClient) {
    this.http.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      // Por ser um subject, podemos mudar seu valor através do 'next'
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    });
  }

  // Essa função é do tipo 'async' pq espera a resposta de um servidor
  getAllUnits(): Observable<Locations[]> {
    return this.allUnits$;
  }

  getFilteredUnits() {
    return this.filteredUnits;
  }

  setFilteredUnits(value: Locations[]) {
    this.filteredUnits = value;
  }
}
