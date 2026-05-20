import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';

export interface Character {
  id: number;
  name: string;
  level: number;
  alive: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  characters: Character[] = [
    {
      id: 1,
      name: 'Arthos',
      level: 10,
      alive: true
    }
  ];

  characterDialog = false;

  character: Character = {
    id: 0,
    name: '',
    level: 1,
    alive: true
  };

  editing = false;

  openNew() {
    this.character = {
      id: 0,
      name: '',
      level: 1,
      alive: true
    };

    this.editing = false;
    this.characterDialog = true;
  }

  editCharacter(character: Character) {
    this.character = { ...character };
    this.editing = true;
    this.characterDialog = true;
  }

  deleteCharacter(id: number) {
    this.characters = this.characters.filter(c => c.id !== id);
  }

  saveCharacter() {

    if (this.editing) {

      this.characters = this.characters.map(c =>
        c.id === this.character.id
          ? { ...this.character }
          : c
      );

    } else {

      this.character.id = Date.now();

      this.characters = [
        ...this.characters,
        { ...this.character }
      ];
    }

    this.characterDialog = false;
  }

  hideDialog() {
    this.characterDialog = false;
  }

}