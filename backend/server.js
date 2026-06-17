/**
 * Backend REST/JSON com autenticacao JWT para o RPG Character Manager.
 *
 * - POST /api/auth/login  -> recebe { username, password } e devolve um token JWT
 * - Todas as rotas /api/characters ficam protegidas por um middleware que
 *   valida o cabecalho Authorization: Bearer <token>
 *
 * Frontend e backend podem rodar na mesma maquina (CORS liberado para o dev server).
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'rpg-character-manager-segredo-troque-em-producao';
const TOKEN_EXPIRATION = '2h';

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// "Bancos" em memoria
// ---------------------------------------------------------------------------

// Usuarios validos para login (em producao isso viria de um banco com hash de senha)
const USERS = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Mestre' }
];

// Personagens (mesmo seed que existia no CharacterService original)
let characters = [
  {
    id: 1,
    name: 'Arthos',
    level: 30,
    alive: true,
    classType: '🛡️ Paladino',
    appearance: 'Armadura dourada e olhos azuis.',
    story: 'Sobreviveu à queda do reino de Valdrakar.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800'
  }
];
let nextId = 2;

// ---------------------------------------------------------------------------
// Autenticacao
// ---------------------------------------------------------------------------

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};

  const user = USERS.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );

  return res.json({ token, username: user.username, name: user.name });
});

// ---------------------------------------------------------------------------
// Middleware: exige um JWT valido
// ---------------------------------------------------------------------------

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token não enviado.' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

// ---------------------------------------------------------------------------
// CRUD de personagens (protegido)
// ---------------------------------------------------------------------------

app.get('/api/characters', authMiddleware, (req, res) => {
  res.json(characters);
});

app.get('/api/characters/:id', authMiddleware, (req, res) => {
  const character = characters.find((c) => c.id === Number(req.params.id));
  if (!character) {
    return res.status(404).json({ message: 'Personagem não encontrado.' });
  }
  res.json(character);
});

app.post('/api/characters', authMiddleware, (req, res) => {
  const character = { ...req.body, id: nextId++ };
  characters.push(character);
  res.status(201).json(character);
});

app.put('/api/characters/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const index = characters.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Personagem não encontrado.' });
  }
  characters[index] = { ...req.body, id };
  res.json(characters[index]);
});

app.delete('/api/characters/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const exists = characters.some((c) => c.id === id);
  if (!exists) {
    return res.status(404).json({ message: 'Personagem não encontrado.' });
  }
  characters = characters.filter((c) => c.id !== id);
  res.status(204).send();
});

// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
  console.log('Login de teste -> usuario: admin | senha: admin123');
});
