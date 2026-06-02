import { Component, inject } from '@angular/core';

import { DialogModule } from 'primeng/dialog';

import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {
  protected readonly service = inject(CharacterService);
}
