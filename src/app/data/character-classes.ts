export const CHARACTER_CLASSES = [
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

export function emptyCharacter() {
  return {
    id: 0,
    name: '',
    level: 1,
    alive: true,
    classType: '',
    appearance: '',
    story: '',
    image: ''
  };
}
