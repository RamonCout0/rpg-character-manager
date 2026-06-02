import { Component, effect, inject, signal } from '@angular/core';

import { DialogModule } from 'primeng/dialog';

import { emptyCharacter } from '../../data/character-classes';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterFormFieldsComponent } from '../character-form-fields/character-form-fields.component';

@Component({
  selector: 'app-character-update',
  standalone: true,
  imports: [DialogModule, CharacterFormFieldsComponent],
  templateUrl: './character-update.component.html'
})
export class CharacterUpdateComponent {
  protected readonly service = inject(CharacterService);

  draft = signal<Character>(emptyCharacter());

  constructor() {
    // Sempre que o personagem selecionado mudar, carrega o rascunho para edição
    effect(() => {
      const character = this.service.selectedCharacter();
      if (character) {
        this.draft.set({ ...character });
      }
    });
  }

  close(): void {
    this.service.updateVisible.set(false);
  }

  save(): void {
    this.service.update({ ...this.draft() });
    this.close();
  }
}
