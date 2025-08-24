import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchValue = signal('');
  showSearch = signal(false);

  @Output() searchChange = new EventEmitter<string>();
  @Output() logoClick = new EventEmitter<void>();

  toggleSearch(): void {
    this.showSearch.set(!this.showSearch());
    if (!this.showSearch()) this.searchValue.set('');
  }

  onSearchChange(): void {
    this.searchChange.emit(this.searchValue());
  }

  onLogoClick(): void {
    this.searchValue.set('');
    this.logoClick.emit();
  }
}
