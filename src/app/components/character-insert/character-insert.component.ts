import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { emptyCharacter } from '../../data/character-classes';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterFormFieldsComponent } from '../character-form-fields/character-form-fields.component';

@Component({
  selector: 'app-character-insert',
  standalone: true,
  imports: [RouterLink, CharacterFormFieldsComponent],
  templateUrl: './character-insert.component.html'
})
export class CharacterInsertComponent {
  protected readonly service = inject(CharacterService);
  private readonly router = inject(Router);

  draft = signal<Character>(emptyCharacter());

  cancel(): void {
    this.router.navigate(['/characters']);
  }

  save(): void {
    this.service.insert(this.draft());
    this.router.navigate(['/characters']);
  }
}
