import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterInsertComponent } from './components/character-insert/character-insert.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterRemoveComponent } from './components/character-remove/character-remove.component';
import { CharacterUpdateComponent } from './components/character-update/character-update.component';
import { CHARACTER_CLASSES } from './data/character-classes';
import { Character } from './models/character';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    CharacterDetailComponent,
    CharacterInsertComponent,
    CharacterListComponent,
    CharacterRemoveComponent,
    CharacterUpdateComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly classes = CHARACTER_CLASSES;

  readonly characters = signal<Character[]>([
    {
      id: 1,
      name: 'Arthos',
      level: 30,
      alive: true,
      classType: '🛡️ Paladino',
      appearance: 'Armadura dourada e olhos azuis.',
      story: 'Sobreviveu à queda do reino de Valdrakar.',
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800'
    }
  ]);

  readonly insertVisible = signal(false);
  readonly detailVisible = signal(false);
  readonly updateVisible = signal(false);
  readonly removeVisible = signal(false);

  readonly selectedDetailCharacter = signal<Character | null>(null);
  readonly selectedUpdateCharacter = signal<Character | null>(null);
  readonly selectedRemoveCharacter = signal<Character | null>(null);

  openInsert(): void {
    this.insertVisible.set(true);
  }

  addCharacter(character: Character): void {
    this.characters.update(characters => [
      ...characters,
      character
    ]);
  }

  openDetail(character: Character): void {
    this.selectedDetailCharacter.set(character);
    this.detailVisible.set(true);
  }

  openUpdate(character: Character): void {
    this.selectedUpdateCharacter.set(character);
    this.updateVisible.set(true);
  }

  updateCharacter(updatedCharacter: Character): void {
    this.characters.update(characters =>
      characters.map(character =>
        character.id === updatedCharacter.id
          ? { ...updatedCharacter }
          : character
      )
    );
  }

  openRemove(character: Character): void {
    this.selectedRemoveCharacter.set(character);
    this.removeVisible.set(true);
  }

  removeCharacter(id: number): void {
    this.characters.update(characters =>
      characters.filter(character => character.id !== id)
    );
  }
}
