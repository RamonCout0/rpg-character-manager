import { Routes } from '@angular/router';

import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterInsertComponent } from './components/character-insert/character-insert.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterUpdateComponent } from './components/character-update/character-update.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'characters', pathMatch: 'full' },

  // Rotas protegidas: só acessíveis após autenticação (authGuard).
  { path: 'characters', component: CharacterListComponent, canActivate: [authGuard] },
  { path: 'characters/new', component: CharacterInsertComponent, canActivate: [authGuard] },
  { path: 'characters/:id', component: CharacterDetailComponent, canActivate: [authGuard] },
  { path: 'characters/:id/edit', component: CharacterUpdateComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'characters' }
];
