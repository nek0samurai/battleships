import { Bullet } from '../bullet';
import { Draw } from '../canvas';
import { IShipParams } from '../interfaces/ship.interface';
import { BulletHandler } from './BulletHandler';

export class ShootHandler {
  drawHelper: Draw;
  bulletHandler: BulletHandler;

  constructor(drawHelper: Draw, bulletHandler: BulletHandler) {
    this.drawHelper = drawHelper;
    this.bulletHandler = bulletHandler;
  }

  shootLeft(ship: IShipParams) {
    if (ship.shoot.left === true && ship.weapons.isLoadedLeft === true) {
      const shotAngle = ship.position.angle;
      this.shoot(
        ship,
        ship.position.randomPosition.randomX,
        ship.position.randomPosition.randomY,
        shotAngle,
        'left'
      );
      ship.weapons.isLoadedLeft = false;
    }
  }

  shootRight(ship: IShipParams) {
    if (ship.shoot.right === true && ship.weapons.isLoadedRight === true) {
      const shotAngle = ship.position.angle;

      this.shoot(
        ship,
        ship.position.randomPosition.randomX + ship.position.shipWidth,
        ship.position.randomPosition.randomY,
        shotAngle,
        'right'
      );
      ship.weapons.isLoadedRight = false;
    }
  }

  shoot(
    ship: IShipParams,
    x: number,
    y: number,
    angle: number,
    position: string
  ) {
    const damage = ship.weapons.damage;
    const bullet = new Bullet(x, y, angle, damage);

    this.bulletHandler.addBulletToStore(bullet);

    this.bulletHandler.bullets.forEach((bullet) => {
      const animateShoot = () => {
        if (bullet.animationFrameId) {
          cancelAnimationFrame(bullet.animationFrameId);
        }

        if (bullet.hasCollided) {
          return;
        }

        bullet.newPos(position);
        this.bulletHandler.actionWithBullets(bullet);

        this.drawHelper.drawBullet();
        this.bulletHandler.checkBulletCollision(ship, bullet);
        this.drawHelper.updateCanvas();
        bullet.animationFrameId = requestAnimationFrame(animateShoot);
      };
      bullet.animationFrameId = requestAnimationFrame(animateShoot);
    });
  }

  reload(ship: IShipParams) {
    setTimeout(() => {
      ship.weapons.isLoadedLeft = true;
      ship.weapons.isLoadedRight = true;
      console.log('Ship ready to shoot');
    }, 1000);
    console.log('Ship reloaded...');
  }
}
