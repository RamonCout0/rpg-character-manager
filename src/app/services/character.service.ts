import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { API_URL } from '../core/api.config';
import { CHARACTER_CLASSES } from '../data/character-classes';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/characters`;

  readonly classes = CHARACTER_CLASSES;

  // Lista mantida em signal e hidratada a partir do backend (HTTP GET).
  readonly characters = signal<Character[]>([]);

  constructor() {
    this.reload();
  }

  /** Recarrega a lista de personagens do backend. */
  reload(): void {
    this.http.get<Character[]>(this.baseUrl).subscribe({
      next: (list) => this.characters.set(list),
      error: () => this.characters.set([])
    });
  }

  list(): Character[] {
    return this.characters();
  }

  getById(id: number): Character | undefined {
    return this.characters().find((c) => c.id === id);
  }

  insert(character: Character): void {
    const { id, ...payload } = character;
    this.http.post<Character>(this.baseUrl, payload).subscribe((created) => {
      this.characters.update((list) => [...list, created]);
    });
  }

  update(updatedCharacter: Character): void {
    this.http
      .put<Character>(`${this.baseUrl}/${updatedCharacter.id}`, updatedCharacter)
      .subscribe((saved) => {
        this.characters.update((list) =>
          list.map((c) => (c.id === saved.id ? saved : c))
        );
      });
  }

  remove(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/${id}`).subscribe(() => {
      this.characters.update((list) => list.filter((c) => c.id !== id));
    });
  }
}
