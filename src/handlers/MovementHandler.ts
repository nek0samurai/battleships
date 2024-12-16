import { Draw } from '../canvas';
import { IShipParams } from '../interfaces/ship.interface';

export class MoveHandler {
  drawHelper: Draw;

  constructor(drawHelper: Draw) {
    this.drawHelper = drawHelper;
  }

  // previous mouse movement
  public moveShipTo(ship: IShipParams, targetX: number, targetY: number) {
    if (ship.animationFrameId) {
      cancelAnimationFrame(ship.animationFrameId);
    }

    ship.isMoving = true;

    const animateMovement = () => {
      const deltaX = targetX - ship.position.shipCenterCoordinate.x;
      const deltaY = targetY - ship.position.shipCenterCoordinate.y;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 0.1) {
        ship.position.shipCenterCoordinate.x = targetX;
        ship.position.shipCenterCoordinate.y = targetY;
        ship.isMoving = false;
        ship.animationFrameId = null;
        this.drawHelper.updateCanvas();
        return;
      }

      const moveX =
        (deltaX / distance) * Math.min(ship.mobility.speed, distance);
      const moveY =
        (deltaY / distance) * Math.min(ship.mobility.speed, distance);

      this.updatePosition(ship, moveX, moveY);
      this.drawHelper.updateCanvas();

      ship.animationFrameId = requestAnimationFrame(animateMovement);
    };

    ship.isMoving = true;
    ship.animationFrameId = requestAnimationFrame(animateMovement);
  }

  private updatePosition(ship: IShipParams, moveX: number, moveY: number) {
    ship.position.randomPosition.randomX += moveX;
    ship.position.randomPosition.randomY += moveY;
    ship.position.shipCenterCoordinate.x =
      ship.position.randomPosition.randomX + ship.position.shipWidth / 2;
    ship.position.shipCenterCoordinate.y =
      ship.position.randomPosition.randomY + ship.position.shipHeight / 2;
  }

  public moveShip(ship: IShipParams) {
    // проверяет не повторяется ли фрейм анимации, для плавности и однотонности анимации
    if (ship.animationFrameId) {
      cancelAnimationFrame(ship.animationFrameId);
    }

    const animateMovement = () => {
      this.newPos(ship);
      ship.isMoving = true;
      this.drawHelper.updateCanvas();
      ship.animationFrameId = requestAnimationFrame(animateMovement);
    };

    ship.animationFrameId = requestAnimationFrame(animateMovement);
  }

  public turnLeft(ship: IShipParams) {
    if (ship.isTurning && !ship.isMoving) {
      console.log(ship.mobility.speed);
      ship.position.moveAngle = -0.2;
      this.moveShip(ship);
    } else {
      ship.position.moveAngle = 0;
      this.moveShip(ship);
    }
  }

  public turnRight(ship: IShipParams) {
    if (ship.isTurning) {
      ship.position.moveAngle = 0.2;
      this.moveShip(ship);
    } else {
      ship.position.moveAngle = 0;
      this.moveShip(ship);
    }
  }

  public moveForward(ship: IShipParams) {
    if (ship.isMoving) {
      ship.mobility.speed = ship.mobility.velocity;
      this.moveShip(ship);
      // console.log(ship.position.randomPosition.randomX);
    } else {
      ship.mobility.speed = 0;
      this.moveShip(ship);
    }
  }

  public moveBack(ship: IShipParams) {
    if (ship.isMoving) {
      ship.mobility.speed = -ship.mobility.velocity;
      this.moveShip(ship);
    } else {
      ship.mobility.speed = 0;
      this.moveShip(ship);
    }
  }

  public newPos(ship: IShipParams) {
    ship.position.randomPosition.randomX += Number(
      ship.mobility.speed * Math.sin(ship.position.angle)
    );
    ship.position.randomPosition.randomY -= Number(
      ship.mobility.speed * Math.cos(ship.position.angle)
    );

    ship.position.angle += ship.position.moveAngle * (Math.PI / 180);
  }
}
