import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchAll, switchMap } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private totalPokemons = 1025;

  constructor(private http: HttpClient) {}

  getPokemonList(page: number = 1, pageSize: number = 20): Observable<Pokemon[]> {
    const offset = (page - 1) * pageSize;
    return this.http
      .get<{ results: { name: string }[] }>(`${this.apiUrl}?offset=${offset}&limit=${pageSize}`)
      .pipe(
        map((res) => res.results),
        map((results) => results.map((r) => r.name)),
        map((names) => {
          const requests = names.map((name) => this.getPokemonByName(name));
          return forkJoin(requests);
        }),

        switchAll()
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`);
  }

  searchPokemon(term: string): Observable<Pokemon[]> {
    term = term.toLowerCase().trim();

    return this.http
      .get<{ results: { name: string }[] }>(`${this.apiUrl}?offset=0&limit=${this.totalPokemons}`)
      .pipe(
        map((res) => res.results.map((r) => r.name)),
        map((names) => names.filter((name) => name.includes(term))),
        switchMap((filteredNames) => {
          if (filteredNames.length === 0) return of([]);
          return forkJoin(filteredNames.map((name) => this.getPokemonByName(name)));
        })
      );
  }
}
