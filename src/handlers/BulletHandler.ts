import { Bullet } from '../bullet';
import { Ship } from '../ship';
import { IShipParams } from '../interfaces/ship.interface';

export class BulletHandler {
  canvas: HTMLCanvasElement;
  bullets: Bullet[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.bullets = [];
  }

  addBulletToStore(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  actionWithBullets(bullet: Bullet) {
    if (this.isBulletOffScreen(bullet)) {
      const index = this.bullets.indexOf(bullet);

      if (index !== -1) {
        this.bullets.splice(index, 1);
      }

      return;
    }
  }

  isBulletOffScreen(bullet: Bullet): boolean {
    return (
      bullet.y <= 0 ||
      bullet.x <= 0 ||
      bullet.x >= this.canvas.width ||
      bullet.y >= this.canvas.height
    );
  }

  checkBulletCollision(ship: IShipParams, bullet: Bullet) {
    const otherShips = Ship.shipsInGame.filter((oShip) => ship.id !== oShip.id);

    otherShips.forEach((enemyShip) => {
      if (bullet.collideWith(enemyShip)) {
        enemyShip.survivability.health -= bullet.damage;
        console.log(enemyShip.survivability.health);
        this.checkOtherShipIsDead(enemyShip);
        bullet.hasCollided = true;
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }

      return false;
    });
  }

  checkOtherShipIsDead(enemyShip: IShipParams) {
    if (enemyShip.survivability.health <= 0) {
      Ship.shipsInGame.splice(Ship.shipsInGame.indexOf(enemyShip), 1);
    }
  }
}
