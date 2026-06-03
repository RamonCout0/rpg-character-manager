import { Injectable, signal } from '@angular/core';

import { CHARACTER_CLASSES } from '../data/character-classes';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
 
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

  list(): Character[] {
    return this.characters();
  }

  getById(id: number): Character | undefined {
    return this.characters().find(c => c.id === id);
  }

  insert(character: Character): void {
    this.characters.update(list => [
      ...list,
      { ...character, id: Date.now() }
    ]);
  }

  update(updatedCharacter: Character): void {
    this.characters.update(list =>
      list.map(c => (c.id === updatedCharacter.id ? { ...updatedCharacter } : c))
    );
  }

  remove(id: number): void {
    this.characters.update(list => list.filter(c => c.id !== id));
  }
}