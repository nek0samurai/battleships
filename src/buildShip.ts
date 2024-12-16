import { Draw } from './canvas';
import { Ship } from './ship';
import {
  cruiserParams,
  destroyerParams,
  battleshipParams,
} from '/src/params.ts';
import { Destroyer, Cruiser, Battleship } from './ship';
import { IShipParams } from './interfaces/ship.interface';

export class PrepareShip {
  drawHelper;
  constructor() {
    this.drawHelper = new Draw();
  }

  private generateRandomPos() {
    const randomPosX = Math.floor(
      Math.random() * (this.drawHelper.canvasWidth * 0.9) // limited field for random spawn
    );
    const randomPosY = Math.floor(
      Math.random() * (this.drawHelper.canvasHeight * 0.9)
    );
    return { randomX: randomPosX, randomY: randomPosY };
  }

  private initShips(n: number) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      const rShipIndex = Math.floor(Math.random() * Ship.availibleTypes.length);

      switch (Ship.availibleTypes[rShipIndex]) {
        case 'Destroyer':
          arr.push(new Destroyer(destroyerParams as IShipParams));
          break;
        case 'Battleship':
          arr.push(new Battleship(battleshipParams as Ship));
          break;
        case 'Cruiser':
          arr.push(new Cruiser(cruiserParams as Ship));
          break;
      }
    }
    return arr;
  }

  public prepareShip(n: number): IShipParams[] {
    const ships = this.initShips(n);
    const preparedShips: IShipParams[] = [];
    ships.map((ship: IShipParams) => {
      // const horizontal = isHorizontal();
      const { randomX, randomY } = this.generateRandomPos();
      const horizontalBody = {
        x: Math.floor(ship.survivability.health! * 0.3 * 2.5),
        y: Math.floor(ship.survivability.health! * 0.7 * 2.5),
      };

      const shipBodyParams = {
        x: horizontalBody.x / 2 + randomX,
        y: horizontalBody.y / 2 + randomY,
      };

      ship.position = {
        angle: 0,
        moveAngle: 0,
        shipWidth: horizontalBody.x,
        shipHeight: horizontalBody.y,
        randomPosition: { randomX: randomX, randomY: randomY },
        shipCenterCoordinate: shipBodyParams,
      };

      preparedShips.push(ship);
    });
    return preparedShips;
  }
}
