import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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

      classType: 'Paladino',
      appearance: 'Armadura dourada e olhos azuis.',
      story: 'Sobreviveu à queda do reino de Valdrakar.',

      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800'
    }
  ];

  characterDialog = false;

  editing = false;

  characterForm = signal<Character>({
    id: 0,

    name: '',
    level: 1,
    alive: true,

    classType: '',
    appearance: '',
    story: '',

    image: ''
  });
  selectedCharacter: Character | null = null;

detailsDialog = false;

viewCharacter(character: Character) {

  this.selectedCharacter = character;

  this.detailsDialog = true;
}

  isFormValid(): boolean {

    const form = this.characterForm();

    return (
      form.name.trim().length >= 3 &&
      form.classType.trim().length >= 3 &&
      form.appearance.trim().length >= 10 &&
      form.story.trim().length >= 15 &&
      form.level > 0
    );
  }

  openNew() {

    this.characterForm.set({
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

    this.characterForm.set({
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

    if (!this.isFormValid()) {
      return;
    }

    const form = this.characterForm();

    if (this.editing) {

      this.characters = this.characters.map(c =>
        c.id === form.id
          ? { ...form }
          : c
      );

    } else {

      form.id = Date.now();

      this.characters = [
        ...this.characters,
        { ...form }
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

      this.characterForm.update(form => ({
        ...form,
        image: reader.result as string
      }));

    };

    reader.readAsDataURL(file);
  }
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



