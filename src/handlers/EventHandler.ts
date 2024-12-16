import { Draw } from '../canvas';
import { MoveHandler } from './MovementHandler';
import { ShootHandler } from './ShootHandler';
import { Ship } from '../ship';
import { IShipParams } from '../interfaces/ship.interface';
import { BulletHandler } from './BulletHandler';

export class EventHandler {
  canvas;
  ctx: CanvasRenderingContext2D | null;
  drawHelper: Draw;
  moveHandler: MoveHandler;
  shootHandler: ShootHandler;
  bulletHandler: BulletHandler;

  constructor(
    drawHelper: Draw,
    canvas: HTMLCanvasElement,
    bulletHandler: BulletHandler
  ) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.drawHelper = drawHelper;
    this.bulletHandler = bulletHandler;
    this.moveHandler = new MoveHandler(this.drawHelper);
    this.shootHandler = new ShootHandler(this.drawHelper, this.bulletHandler);
  }

  public eventHander(e: MouseEvent | KeyboardEvent) {
    switch (e.type) {
      case 'dblclick':
        this.doubleClickHandler(e as MouseEvent);
        break;

      case 'click':
        this.singleClickHandler(e as MouseEvent);
        break;

      case 'contextmenu':
        this.rightClickHandler(e as MouseEvent);
        break;

      case 'mousemove':
        this.hoverHandler(e as MouseEvent);
        break;

      case 'keydown':
        this.keydownHandler(e as KeyboardEvent);
        break;

      case 'keyup':
        this.keyupHandler(e as KeyboardEvent);
        break;
    }
  }

  private keydownHandler(e: KeyboardEvent) {
    for (let ship of Ship.shipsInGame) {
      ship.isMoving = false;
      ship.isTurning = false;
      if (ship.selected) {
        switch (e.key) {
          //MOVEMENT
          case 'a':
            ship.isTurning = true;
            this.moveHandler.turnLeft(ship);
            break;
          case 'd':
            ship.isTurning = true;
            this.moveHandler.turnRight(ship);
            break;
          case 'w':
            ship.isMoving = true;
            ship.mobility.speed = ship.mobility.velocity;
            this.moveHandler.moveForward(ship);
            break;
          case 's':
            ship.isMoving = true;
            ship.mobility.speed = -ship.mobility.velocity;
            this.moveHandler.moveBack(ship);
            break;
          //ATTACK
          case 'q':
            if (ship.weapons.isLoadedLeft) {
              ship.shoot.left = true;
              this.shootHandler.shootLeft(ship);
            }
            break;
          case 'e':
            if (ship.weapons.isLoadedRight) {
              ship.shoot.right = true;
              this.shootHandler.shootRight(ship);
            }
            break;
          case 'r':
            this.shootHandler.reload(ship);
            break;
        }
      }
    }
  }

  private keyupHandler(e: KeyboardEvent) {
    for (let ship of Ship.shipsInGame) {
      if (ship.selected) {
        switch (e.key) {
          //MOVEMENT
          case 'a':
            ship.isTurning = false;
            this.moveHandler.turnLeft(ship);
            break;
          case 'd':
            ship.isTurning = false;
            this.moveHandler.turnRight(ship);
            break;
          case 'w':
            ship.isMoving = false;
            ship.mobility.speed = 0;
            this.moveHandler.moveForward(ship);
            break;
          case 's':
            ship.isMoving = false;
            ship.mobility.speed = 0;
            this.moveHandler.moveBack(ship);
            break;
          //ATTACK
          // case 'q':
          //   ship.shoot.left = false;
          //   this.shootHandler.shootLeft(ship);
          //   break;
          // case 'e':
          //   ship.shoot.right = false;
          //   this.shootHandler.shootRight(ship);
          //   break;
        }
      }
    }
  }

  private doubleClickHandler(e: MouseEvent): IShipParams | null {
    console.log('double click');
    const rect = this.canvas.getBoundingClientRect();
    const eventX = Math.floor(e.clientX - rect.left);
    const eventY = Math.floor(e.clientY - rect.top);

    for (let ship of Ship.shipsInGame) {
      const cond = this.ctx!.isPointInPath(ship.rect, eventX, eventY);
      if (cond) {
        ship.selected = !ship.selected; // Toggle selection
        console.log(`Ship selected: ${ship.selected}`);
        this.drawHelper.toggleBorderOnShips('yellow');
        // this.drawHelper.updateShips();
        return ship;
      }
    }
    return null;
  }

  private singleClickHandler(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const eventX = Math.floor(e.clientX - rect.left);
    const eventY = Math.floor(e.clientY - rect.top);

    for (let ship of Ship.shipsInGame) {
      const cond = this.ctx!.isPointInPath(ship.rect, eventX, eventY);

      if (!cond) {
        ship.selected = false;
      }
    }
    this.drawHelper.updateCanvas();
    this.canvas.focus();
  }

  private rightClickHandler(e: MouseEvent): void {
    //убираем вызов конткстного меню
    e.preventDefault();

    // const rect = this.canvas.getBoundingClientRect();
    // const eventX = Math.floor(e.clientX - rect.left);
    // const eventY = Math.floor(e.clientY - rect.top);

    // // Move selected ships to the new position
    // Ship.shipsInGame.forEach((ship) => {
    //   if (ship.selected) {
    //     this.moveHandler.moveShipTo(ship, eventX, eventY);
    //   }
    // });
  }

  private hoverHandler(e: MouseEvent): IShipParams | null {
    const rect = this.canvas.getBoundingClientRect();
    const eventX = e.clientX - rect.left;
    const eventY = e.clientY - rect.top;

    // Reset hover state for all ships
    Ship.shipsInGame.forEach((ship) => {
      ship.isHover = false;
    });

    const filteredShips = Ship.shipsInGame.filter((ship) => !ship.selected);

    for (let ship of filteredShips) {
      const cond = this.ctx!.isPointInPath(ship.rect, eventX, eventY); // Check against updated Path2D

      if (cond) {
        ship.isHover = true; // Set hover state for hovered ship
        this.drawHelper.hoverBorderOnShip('#f7f7f7'); // Draw hover border
        return ship; // Return hovered ship
      }
    }

    this.drawHelper.updateCanvas(); // Update canvas if no ships are hovered
    return null; // No ship hovered
  }
}
