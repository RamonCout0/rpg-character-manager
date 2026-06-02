import { Injectable, signal } from '@angular/core';

import { CHARACTER_CLASSES, emptyCharacter } from '../data/character-classes';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  // Dados das classes disponíveis
  readonly classes = CHARACTER_CLASSES;

  // Estado: lista de personagens
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

  // Estado: personagem selecionado (compartilhado entre detalhe, edição e remoção)
  readonly selectedCharacter = signal<Character | null>(null);

  // Estado: visibilidade dos modais
  readonly insertVisible = signal(false);
  readonly detailVisible = signal(false);
  readonly updateVisible = signal(false);
  readonly removeVisible = signal(false);

  // ── Operações CRUD ──────────────────────────────────────────────────────────

  /** Retorna a lista atual de personagens. */
  list(): Character[] {
    return this.characters();
  }

  /** Busca um personagem pelo id. */
  getById(id: number): Character | undefined {
    return this.characters().find(c => c.id === id);
  }

  /** Insere um novo personagem na lista. */
  insert(character: Character): void {
    this.characters.update(characters => [
      ...characters,
      { ...character, id: Date.now() }
    ]);
  }

  /** Atualiza um personagem existente. */
  update(updatedCharacter: Character): void {
    this.characters.update(characters =>
      characters.map(c => (c.id === updatedCharacter.id ? { ...updatedCharacter } : c))
    );
  }

  /** Remove um personagem pelo id. */
  remove(id: number): void {
    this.characters.update(characters => characters.filter(c => c.id !== id));
  }

  // ── Controle de modais ──────────────────────────────────────────────────────

  openInsert(): void {
    this.insertVisible.set(true);
  }

  openDetail(character: Character): void {
    this.selectedCharacter.set(character);
    this.detailVisible.set(true);
  }

  openUpdate(character: Character): void {
    this.selectedCharacter.set(character);
    this.updateVisible.set(true);
  }

  openRemove(character: Character): void {
    this.selectedCharacter.set(character);
    this.removeVisible.set(true);
  }
}
