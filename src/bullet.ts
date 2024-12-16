import { IBulletInterface } from './interfaces/bullet.interface';
import { IShipParams } from './interfaces/ship.interface';

export class Bullet implements IBulletInterface {
  animationFrameId: number | null;
  x: number;
  y: number;
  width: number;
  height: number;
  initialAngle: number;
  damage: number;
  hasCollided: boolean;

  constructor(x: number, y: number, angle: number, damage: number) {
    this.x = x;
    this.y = y;
    this.initialAngle = angle;
    this.width = 5;
    this.height = 5;
    this.damage = damage;
    this.animationFrameId = null;
    this.hasCollided = false;
  }

  newPos(position: string) {
    const speed = 1;

    switch (position) {
      case 'left':
        this.x -= speed * Math.cos(this.initialAngle);
        this.y -= speed * Math.sin(this.initialAngle);
        break;
      case 'right':
        this.x += speed * Math.cos(this.initialAngle);
        this.y += speed * Math.sin(this.initialAngle);
    }
  }

  collideWith(ship: IShipParams) {
    if (
      this.x <=
        ship.position.randomPosition.randomX + ship.position.shipWidth &&
      this.x >= ship.position.randomPosition.randomX &&
      this.y <=
        ship.position.randomPosition.randomY + ship.position.shipHeight &&
      this.y >= ship.position.randomPosition.randomY
    ) {
      return true;
    }
    return false;
  }
}
