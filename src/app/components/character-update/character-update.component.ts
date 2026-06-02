import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { emptyCharacter } from '../../data/character-classes';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterFormFieldsComponent } from '../character-form-fields/character-form-fields.component';

@Component({
  selector: 'app-character-update',
  standalone: true,
  imports: [RouterLink, CharacterFormFieldsComponent],
  templateUrl: './character-update.component.html'
})
export class CharacterUpdateComponent implements OnInit {
  protected readonly service = inject(CharacterService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Rascunho inicializado com os dados vindos do parâmetro de rota. */
  draft = signal<Character>(emptyCharacter());

  ngOnInit(): void {
    // Lê o parâmetro :id enviado pela listagem ao ativar esta rota
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const found = this.service.getById(id);

      if (!found) {
        // Id inválido: volta para a listagem
        this.router.navigate(['/characters']);
        return;
      }

      // Carrega os dados do personagem no rascunho editável
      this.draft.set({ ...found });
    });
  }

  cancel(): void {
    this.router.navigate(['/characters']);
  }

  save(): void {
    this.service.update({ ...this.draft() });
    this.router.navigate(['/characters']);
  }
}
