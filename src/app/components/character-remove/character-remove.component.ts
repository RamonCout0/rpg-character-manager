import { Component, inject, model, output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-remove',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './character-remove.component.html'
})
export class CharacterRemoveComponent {
  private readonly service = inject(CharacterService);

  // Controla a visibilidade do modal (Two-way data binding baseado em Signals)
  visible = model<boolean>(false);
  
  // Recebe o personagem que deve ser exibido/removido
  character = model<Character | null>(null);

  cancel(): void {
    this.visible.set(false);
    this.character.set(null); // Limpa o estado ao fechar
  }

  confirm(): void {
    const activeCharacter = this.character();
    if (!activeCharacter) return;

    this.service.remove(activeCharacter.id);
    this.visible.set(false);
    this.character.set(null); // Limpa o estado após remover
  }
}