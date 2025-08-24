import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../../models/pokemon.model';
import { PokedexService } from '../../services/pokedex.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    CommonModule,
    PokemonCardComponent,
    MatPaginatorModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  allPokemons = signal<Pokemon[]>([]);
  pokemons = signal<Pokemon[]>([]);
  filteredPokemons = signal<Pokemon[]>([]);
  loading = signal(true);
  currentPage = signal(1);
  pageSize = 20;
  totalPokemons = 151;
  error = signal<string | null>(null);
  searchTerm = signal('');
  activeType: string = '';

  pokemonTypes = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'steel',
    'fairy',
  ];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.loadAllPokemons();
    this.loadPokemons(1);
  }

  loadAllPokemons(): void {
    this.pokedexService.getPokemonList(1, this.totalPokemons).subscribe({
      next: (pokemons) => {
        this.allPokemons.set(pokemons);
      },
      error: () => {
        console.error('Erro ao carregar todos os pokémons para filtro');
      },
    });
  }

  loadPokemons(page: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    const term = this.searchTerm();

    if (term) {
      this.pokedexService.searchPokemon(term).subscribe({
        next: (pokemons) => {
          this.pokemons.set(pokemons);
          this.applyFilter();
          this.loading.set(false);
        },
        error: () => {
          this.pokemons.set([]);
          this.filteredPokemons.set([]);
          this.error.set('Pokémon não encontrado');
          this.loading.set(false);
        },
      });
      return;
    }

    if (this.activeType) {
      const filtered = this.allPokemons().filter((p) =>
        p.types.some((t) => t.type.name === this.activeType)
      );
      this.pokemons.set(filtered);
      this.applyFilter();
      this.loading.set(false);
      return;
    }

    this.pokedexService.getPokemonList(page, this.pageSize).subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons);
        this.applyFilter();
        this.loading.set(false);
      },
      error: () => {
        this.pokemons.set([]);
        this.filteredPokemons.set([]);
        this.error.set('Erro ao carregar pokémons');
        this.loading.set(false);
      },
    });
  }

  applyFilter(): void {
    let list = this.pokemons();
    if (this.activeType) {
      list = list.filter((p) => p.types.some((t) => t.type.name === this.activeType));
    }
    this.filteredPokemons.set(list);
  }

  filterByType(type: string) {
    this.activeType = type;
    this.currentPage.set(1);
    this.loadPokemons(1);
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.loadPokemons(1);
  }

  onPageChange(event: any): void {
    if (this.searchTerm() || this.activeType) return;
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize = event.pageSize;
    this.loadPokemons(this.currentPage());
  }

  onLogoClick(): void {
    this.searchTerm.set('');
    this.activeType = '';
    this.currentPage.set(1);
    this.loadPokemons(1);
  }

  trackById(index: number, pokemon: Pokemon): number {
    return pokemon.id;
  }
}
