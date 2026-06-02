import { Component, inject, signal } from '@angular/core';

import { DialogModule } from 'primeng/dialog';

import { emptyCharacter } from '../../data/character-classes';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterFormFieldsComponent } from '../character-form-fields/character-form-fields.component';

@Component({
  selector: 'app-character-insert',
  standalone: true,
  imports: [DialogModule, CharacterFormFieldsComponent],
  templateUrl: './character-insert.component.html'
})
export class CharacterInsertComponent {
  protected readonly service = inject(CharacterService);

  draft = signal<Character>(emptyCharacter());

  resetAndClose(): void {
    this.draft.set(emptyCharacter());
    this.service.insertVisible.set(false);
  }

  save(): void {
    this.service.insert(this.draft());
    this.resetAndClose();
  }
}
