import { Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-form-fields',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './character-form-fields.component.html'
})
export class CharacterFormFieldsComponent {
  character = model.required<Character>();
  classes = input.required<string[]>();
  saveLabel = input('Salvar');

  save = output<void>();
  cancel = output<void>();

  formInvalid = computed(() => {
    const character = this.character();

    return (
      character.name.trim().length < 3 ||
      character.classType.trim().length < 3 ||
      character.level < 1 ||
      character.appearance.trim().length < 10 ||
      character.story.trim().length < 15
    );
  });

  updateField<K extends keyof Character>(field: K, value: Character[K]): void {
    this.character.update(character => ({
      ...character,
      [field]: value
    }));
  }
}
