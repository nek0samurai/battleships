import { IShipParams } from './interfaces/ship.interface';

export function generateID(): string {
  const id = 'id' + Math.random().toString(16).slice(2);
  return id;
}

export const destroyerParams: Partial<IShipParams> = {
  // тонкий
  type: 'Destroyer',
  weapons: {
    guns: 10,
    damage: 1,
    reload: 1000,
  },
  mobility: {
    speed: 0,
    velocity: 0.2,
    evasion: 40,
  },
  survivability: {
    health: 15,
    armor: 1,
  },
};

export const cruiserParams: Partial<IShipParams> = {
  // средний
  type: 'Cruiser',
  weapons: {
    guns: 15,
    damage: 3,
    reload: 5000,
  },
  mobility: {
    speed: 0,
    velocity: 0.15,
    evasion: 10,
  },
  survivability: {
    health: 20,
    armor: 3,
  },
};

export const battleshipParams: Partial<IShipParams> = {
  // жирнич
  type: 'Battleship',
  weapons: {
    guns: 30,
    damage: 5,
    reload: 3000,
  },
  mobility: {
    speed: 0,
    velocity: 0.1,
    evasion: 2,
  },
  survivability: {
    health: 25,
    armor: 10,
  },
};
