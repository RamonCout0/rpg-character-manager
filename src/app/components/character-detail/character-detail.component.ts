import { Component, input, model } from '@angular/core';

import { DialogModule } from 'primeng/dialog';

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {
  visible = model(false);
  character = input<Character | null>(null);
}
