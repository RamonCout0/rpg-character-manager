import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-remove',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './character-remove.component.html'
})
export class CharacterRemoveComponent {
  protected readonly service = inject(CharacterService);

  cancel(): void {
    this.service.removeVisible.set(false);
  }

  confirm(): void {
    const character = this.service.selectedCharacter();
    if (!character) return;

    this.service.remove(character.id);
    this.service.removeVisible.set(false);
  }
}
