import { generateRandomName, generateRandonColor } from './names';
import { generateID } from './params';
import { IShipParams } from './interfaces/ship.interface';

export class Ship implements IShipParams {
  public static count: number;
  public static availibleTypes: string[] = [];
  public static shipsInGame: IShipParams[] = [];

  public position;
  public rect;
  public color;
  public id: string;
  public name: string;
  public maxDamage: number;
  public maxEvasions: number;
  public type: string;
  public selected: boolean;
  public isHover: boolean;
  public isMoving: boolean;
  public isTurning: boolean;
  public rotation: number;
  public animationFrameId: number | null;

  public weapons: {
    guns: number;
    damage: number;
    reload: number;
    isLoadedLeft?: boolean;
    isLoadedRight?: boolean;
  };
  public mobility: {
    speed: number;
    velocity: number;
    evasion: number;
  };
  public survivability: {
    health: number;
    armor: number;
  };
  public shoot: {
    left: boolean;
    right: boolean;
  };

  constructor(private params: IShipParams) {
    this.id = generateID();
    this.name = generateRandomName();
    this.maxDamage = 0;
    this.maxEvasions = 0;
    this.selected = false;
    this.isHover = false;
    this.type = params.type;
    this.rect = params.rect;

    this.weapons = { ...params.weapons };
    this.mobility = { ...params.mobility };
    this.survivability = { ...params.survivability };
    this.position = { ...params.position };
    this.shoot = { ...params.shoot };
    this.isMoving = false;
    this.isTurning = false;
    this.weapons.isLoadedLeft = false;
    this.weapons.isLoadedRight = false;
    this.rotation = 0;
    this.animationFrameId = null;
    this.color! = generateRandonColor();
  }

  public get speed(): number {
    return this.params.mobility.speed;
  }

  public get angle(): number {
    return this.params.position.angle;
  }

  public get moveAngle(): number {
    return this.params.position.moveAngle;
  }

  public get evasion(): number {
    return this.params.mobility.evasion;
  }

  public get health(): number {
    return this.params.survivability.health;
  }
  public get damage(): number {
    return this.params.weapons.damage;
  }

  public get reload(): number {
    return this.params.weapons.reload;
  }

  public setMaxDamage(damage: number) {
    this.maxDamage += damage;
    const ship: Element | null = document.querySelector(`#table-${this.id}`);
    const selector = ship?.querySelector('.data-maxdamage');

    if (selector) {
      selector.innerHTML = this.maxDamage.toString();
    }
  }

  public setMaxEvasion() {
    this.maxEvasions += 1;
    const ship: Element | null = document.querySelector(`#table-${this.id}`);
    const selector = ship?.querySelector('.data-maxevasions');

    if (selector) {
      selector.innerHTML = this.maxEvasions.toString();
    }
  }

  public setHealth(damage: number) {
    this.params.survivability.health -= damage;
  }

  public async shootasda(): Promise<void> {
    console.log(`${this.name} reload guns...`);
    const reload = await this.reloadGuns();
    // if (reload) ShootHandler.shootHelper(this.id, this.name, this.damage);
    this.setMaxDamage(this.damage);
  }

  private async reloadGuns(): Promise<boolean> {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, this.reload);
    });
  }
}

export class Destroyer extends Ship {
  constructor(params: IShipParams) {
    super(params);
  }
}

export class Cruiser extends Ship {
  constructor(params: IShipParams) {
    super(params);
  }
}

export class Battleship extends Ship {
  constructor(params: IShipParams) {
    super(params);
  }
}
