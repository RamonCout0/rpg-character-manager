# 🎲 RPG Character Manager

Sistema web para gerenciamento de personagens de RPG de mesa desenvolvido com **Angular 21**, **PrimeNG 21** e **Tailwind CSS 4**.

O projeto permite criar, visualizar, editar e remover personagens de forma moderna e responsiva, utilizando componentes visuais do PrimeNG e utilitários do Tailwind.

---

# 📸 Funcionalidades

✅ Cadastro de personagens  
✅ Edição de personagens  
✅ Remoção de personagens  
✅ Visualização detalhada da ficha  
✅ Upload de imagem via URL  
✅ Classes pré-definidas de D&D  
✅ Sistema visual com cores por classe  
✅ Validação de formulário  
✅ Signal Forms  
✅ Layout responsivo  
✅ Interface moderna com Tailwind + PrimeNG  

---

# 🧙 Classes Disponíveis

- 🪓 Bárbaro
- 🎵 Bardo
- ☠️ Bruxo
- 🙏 Clérigo
- 🌿 Druida
- 🔥 Feiticeiro
- ⚔️ Guerreiro
- 🗡️ Ladino
- 🧙 Mago
- 👊 Monge
- 🛡️ Paladino
- 🏹 Patrulheiro

---

# 🚀 Tecnologias Utilizadas

- Angular 21
- PrimeNG 21
- Tailwind CSS 4
- TypeScript
- HTML5
- CSS3

---

# 📦 Instalação

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/RamonCout0/rpg-character-manager.git
```

---

## 2️⃣ Entrar na pasta do projeto

```bash
cd rpg-character-manager
```

---

## 3️⃣ Instalar dependências

```bash
npm install
```

---

# 🎨 Instalação do PrimeNG

## Instalar PrimeNG e PrimeIcons

```bash
npm install primeng primeicons
```

---

# 🌪️ Instalação do Tailwind CSS 4

## Instalar Tailwind

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

---

## Configurar o arquivo `styles.css`

```css
@import "tailwindcss";
@import "primeicons/primeicons.css";
```

---

# ▶️ Executar o projeto

```bash
ng serve
```

Depois abrir:

```txt
http://localhost:4200
```

---

# 📁 Estrutura do Projeto

```txt
src/
 ├── app/
 │   ├── app.ts
 │   ├── app.html
 │   ├── app.css
 │
 ├── styles.css
```

---

# 🎯 Funcionalidades da Última Implementação

## ✅ Signal Forms

O formulário foi implementado utilizando Signals do Angular:

```ts
characterForm = signal<Character>({
  ...
});
```

---

## ✅ Validação dos Campos

O sistema valida:

- Nome mínimo
- Classe obrigatória
- Aparência mínima
- História mínima
- Nível válido

---

## ✅ Botão desabilitado

O botão de salvar só é liberado quando:

```ts
isFormValid()
```

retorna verdadeiro.

---

# 🖼️ Imagens

As imagens dos personagens são carregadas através de URL:

```txt
https://site.com/imagem.jpg
```

---

# 🎨 Interface

O projeto utiliza:

- PrimeNG para componentes
- Tailwind CSS para estilização
- Tema escuro RPG
- Cards e modais modernos
- Responsividade

---

# 📚 Referências

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}

---

# 👨‍💻 Autor

Projeto desenvolvido para a disciplina utilizando Angular + PrimeNG + Tailwind CSS.
