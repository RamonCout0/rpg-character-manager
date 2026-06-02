import { Routes } from '@angular/router';

import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterInsertComponent } from './components/character-insert/character-insert.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterUpdateComponent } from './components/character-update/character-update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/new', component: CharacterInsertComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'characters/:id/edit', component: CharacterUpdateComponent },
  { path: '**', redirectTo: 'characters' }
];
