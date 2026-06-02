import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterRemoveComponent } from '../character-remove/character-remove.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, RouterLink, CharacterRemoveComponent],
  templateUrl: './character-list.component.html'
})
export class CharacterListComponent {
  protected readonly service = inject(CharacterService);
  private readonly router = inject(Router);

  /** Navega para a rota de detalhe passando o id do personagem. */
  goToDetail(character: Character): void {
    this.router.navigate(['/characters', character.id]);
  }

  /** Navega para a rota de edição passando o id do personagem. */
  goToUpdate(character: Character): void {
    this.router.navigate(['/characters', character.id, 'edit']);
  }

  getClassColor(classType: string): string {
    switch (classType) {
      case '⚔️ Guerreiro':   return 'bg-red-500/20 text-red-300';
      case '🧙 Mago':        return 'bg-blue-500/20 text-blue-300';
      case '🛡️ Paladino':   return 'bg-yellow-500/20 text-yellow-300';
      case '🏹 Patrulheiro': return 'bg-green-500/20 text-green-300';
      case '🗡️ Ladino':     return 'bg-slate-500/20 text-slate-300';
      case '🔥 Feiticeiro':  return 'bg-orange-500/20 text-orange-300';
      case '☠️ Bruxo':      return 'bg-purple-500/20 text-purple-300';
      case '🎵 Bardo':       return 'bg-pink-500/20 text-pink-300';
      case '🌿 Druida':      return 'bg-emerald-500/20 text-emerald-300';
      case '🙏 Clérigo':     return 'bg-cyan-500/20 text-cyan-300';
      case '👊 Monge':       return 'bg-amber-500/20 text-amber-300';
      case '🪓 Bárbaro':     return 'bg-rose-500/20 text-rose-300';
      default:               return 'bg-slate-500/20 text-slate-300';
    }
  }
}
