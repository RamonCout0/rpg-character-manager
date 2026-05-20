import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  form,
  required,
  minLength,
  min
} from '@angular/forms/signals';

import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';

export interface Character {

  id: number;

  name: string;
  level: number;
  alive: boolean;

  classType: string;
  appearance: string;
  story: string;

  image: string;
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
    CheckboxModule,
    SelectModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  characters: Character[] = [
    {
      id: 1,

      name: 'Arthos',
      level: 30,
      alive: true,

      classType: '🛡️ Paladino',
      appearance: 'Armadura dourada e olhos azuis.',
      story: 'Sobreviveu à queda do reino de Valdrakar.',

      image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800'
    }
  ];

  characterDialog = false;

  detailsDialog = false;

  editing = false;

  selectedCharacter: Character | null = null;

  classes = [
    '🪓 Bárbaro',
    '🎵 Bardo',
    '☠️ Bruxo',
    '🙏 Clérigo',
    '🌿 Druida',
    '🔥 Feiticeiro',
    '⚔️ Guerreiro',
    '🗡️ Ladino',
    '🧙 Mago',
    '👊 Monge',
    '🛡️ Paladino',
    '🏹 Patrulheiro'
  ];

  characterModel = signal<Character>({
    id: 0,

    name: '',
    level: 1,
    alive: true,

    classType: '',
    appearance: '',
    story: '',

    image: ''
  });

  characterForm = form(
    this.characterModel,
    (path) => {

      required(path.name);
      minLength(path.name, 3);

      required(path.classType);
      minLength(path.classType, 3);

      required(path.appearance);
      minLength(path.appearance, 10);

      required(path.story);
      minLength(path.story, 15);

      min(path.level, 1);
    }
  );

  viewCharacter(character: Character) {

    this.selectedCharacter = character;

    this.detailsDialog = true;
  }

  openNew() {

    this.characterModel.set({
      id: 0,

      name: '',
      level: 1,
      alive: true,

      classType: '',
      appearance: '',
      story: '',

      image: ''
    });

    this.editing = false;

    this.characterDialog = true;
  }

  editCharacter(character: Character) {

    this.characterModel.set({
      ...character
    });

    this.editing = true;

    this.characterDialog = true;
  }

  deleteCharacter(id: number) {

    this.characters = this.characters.filter(
      c => c.id !== id
    );
  }

  saveCharacter() {

    if (this.characterForm().invalid()) {
      return;
    }

    const form = this.characterModel();

    if (this.editing) {

      this.characters = this.characters.map(c =>
        c.id === form.id
          ? { ...form }
          : c
      );

    } else {

      const newCharacter = {
        ...form,
        id: Date.now()
      };

      this.characters = [
        ...this.characters,
        newCharacter
      ];
    }

    this.characterDialog = false;
  }

  hideDialog() {

    this.characterDialog = false;
  }

  onImageChange(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.characterModel.update(form => ({
        ...form,
        image: reader.result as string
      }));
    };

    reader.readAsDataURL(file);
  }

  getClassColor(classType: string): string {

    switch (classType) {

      case '⚔️ Guerreiro':
        return 'bg-red-500/20 text-red-300';

      case '🧙 Mago':
        return 'bg-blue-500/20 text-blue-300';

      case '🛡️ Paladino':
        return 'bg-yellow-500/20 text-yellow-300';

      case '🏹 Patrulheiro':
        return 'bg-green-500/20 text-green-300';

      case '🗡️ Ladino':
        return 'bg-slate-500/20 text-slate-300';

      case '🔥 Feiticeiro':
        return 'bg-orange-500/20 text-orange-300';

      case '☠️ Bruxo':
        return 'bg-purple-500/20 text-purple-300';

      case '🎵 Bardo':
        return 'bg-pink-500/20 text-pink-300';

      case '🌿 Druida':
        return 'bg-emerald-500/20 text-emerald-300';

      case '🙏 Clérigo':
        return 'bg-cyan-500/20 text-cyan-300';

      case '👊 Monge':
        return 'bg-amber-500/20 text-amber-300';

      case '🪓 Bárbaro':
        return 'bg-rose-500/20 text-rose-300';

      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  }
}