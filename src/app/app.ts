import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterInsertComponent } from './components/character-insert/character-insert.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterRemoveComponent } from './components/character-remove/character-remove.component';
import { CharacterUpdateComponent } from './components/character-update/character-update.component';
import { CharacterService } from './services/character.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    CharacterDetailComponent,
    CharacterInsertComponent,
    CharacterListComponent,
    CharacterRemoveComponent,
    CharacterUpdateComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly service = inject(CharacterService);
}
