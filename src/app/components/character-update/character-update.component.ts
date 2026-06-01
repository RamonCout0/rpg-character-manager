import { Component, effect, input, model, output, signal } from '@angular/core';

import { DialogModule } from 'primeng/dialog';

import { emptyCharacter } from '../../data/character-classes';
import { Character } from '../../models/character';
import { CharacterFormFieldsComponent } from '../character-form-fields/character-form-fields.component';

@Component({
  selector: 'app-character-update',
  standalone: true,
  imports: [DialogModule, CharacterFormFieldsComponent],
  templateUrl: './character-update.component.html'
})
export class CharacterUpdateComponent {
  visible = model(false);
  character = input<Character | null>(null);
  classes = input.required<string[]>();

  update = output<Character>();

  draft = signal<Character>(emptyCharacter());

  constructor() {
    effect(() => {
      const character = this.character();

      if (character) {
        this.draft.set({ ...character });
      }
    });
  }

  close(): void {
    this.visible.set(false);
  }

  save(): void {
    this.update.emit({ ...this.draft() });
    this.close();
  }
}
