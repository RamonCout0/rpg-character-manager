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