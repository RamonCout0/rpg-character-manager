import { Component, input, model, output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-remove',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './character-remove.component.html'
})
export class CharacterRemoveComponent {
  visible = model(false);
  character = input<Character | null>(null);

  confirmRemove = output<number>();

  cancel(): void {
    this.visible.set(false);
  }

  confirm(): void {
    const character = this.character();

    if (!character) {
      return;
    }

    this.confirmRemove.emit(character.id);
    this.visible.set(false);
  }
}
