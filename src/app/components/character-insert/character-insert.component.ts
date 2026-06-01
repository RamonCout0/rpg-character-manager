import { Component, input, model, output, signal } from '@angular/core';

import { DialogModule } from 'primeng/dialog';

import { Character } from '../../models/character';
import { emptyCharacter } from '../../data/character-classes';
import { CharacterFormFieldsComponent } from '../character-form-fields/character-form-fields.component';

@Component({
  selector: 'app-character-insert',
  standalone: true,
  imports: [DialogModule, CharacterFormFieldsComponent],
  templateUrl: './character-insert.component.html'
})
export class CharacterInsertComponent {
  visible = model(false);
  classes = input.required<string[]>();

  insert = output<Character>();

  draft = signal<Character>(emptyCharacter());

  resetAndClose(): void {
    this.draft.set(emptyCharacter());
    this.visible.set(false);
  }

  save(): void {
    this.insert.emit({
      ...this.draft(),
      id: Date.now()
    });

    this.resetAndClose();
  }
}
