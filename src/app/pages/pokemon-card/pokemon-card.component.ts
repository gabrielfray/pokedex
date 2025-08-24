import { Component, ElementRef, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: Pokemon;

  constructor(private el: ElementRef) {}

  getPokemonImage(): string {
    return (
      this.pokemon.sprites.other?.['official-artwork']?.front_default ||
      this.pokemon.sprites.front_default
    );
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  formatPokemonId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }

  ngAfterViewInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelector('.card-container'), {
      max: 20,
      speed: 400,
      glare: true,
      'max-glare': 0.4,
      scale: 1.05,
    });
  }
}
