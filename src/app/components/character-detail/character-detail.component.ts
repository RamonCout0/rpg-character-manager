import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterRemoveComponent } from '../character-remove/character-remove.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterLink, CharacterRemoveComponent],
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent implements OnInit {
  protected readonly service = inject(CharacterService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Personagem carregado a partir do id recebido na rota. */
  character = signal<Character | null>(null);

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

      this.character.set(found);
    });
  }

  goToUpdate(): void {
    const character = this.character();
    if (character) {
      this.router.navigate(['/characters', character.id, 'edit']);
    }
  }
}
