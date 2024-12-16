import { Ship } from './ship';

import { EventHandler } from './handlers/EventHandler';
import { IShipParams } from './interfaces/ship.interface';
import { ShootHandler } from './handlers/ShootHandler';
import { BulletHandler } from './handlers/BulletHandler';

export class Draw {
  canvasWidth: number = 600;
  canvasHeight: number = 600;
  private cellSize: number;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  isShowMatrix: boolean;
  button: HTMLElement | null;
  clickedMousePosition;
  eventHandler;
  shootHandler: ShootHandler;
  bulletHandler: BulletHandler;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas');
    this.canvas.setAttribute('tabindex', '0');
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = this.canvasWidth / 10;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.isShowMatrix = true;
    this.button = document.querySelector('.showCoordinates');
    this.clickedMousePosition = {
      x: 0,
      y: 0,
    };
    this.bulletHandler = new BulletHandler(this.canvas);
    this.eventHandler = new EventHandler(this, this.canvas, this.bulletHandler);
    this.shootHandler = new ShootHandler(this, this.bulletHandler);

    this.canvas.addEventListener('dblclick', (e: MouseEvent) => {
      this.eventHandler.eventHander(e);
    });
    this.canvas.addEventListener('click', (e: MouseEvent) => {
      this.eventHandler.eventHander(e);
      this.canvas.focus();
    });
    this.canvas.addEventListener('contextmenu', (e: MouseEvent) => {
      this.eventHandler.eventHander(e);
    });
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.eventHandler.eventHander(e);
    });
    this.canvas.addEventListener('keydown', (e) => {
      this.eventHandler.eventHander(e);
    });
    this.canvas.addEventListener('keyup', (e) => {
      this.eventHandler.eventHander(e);
    });
    // this.button!.addEventListener('click', (e) => this.toggleShowMatrix(e));
  }

  public get canvasEl() {
    return this.canvas;
  }

  public get ctxEl() {
    return this.ctx;
  }

  public get matrix() {
    return this.drawCoordinatedSystem();
  }

  public redrawCanvas() {
    this.clearCanvas();
  }

  public startCanvas() {
    this.drawCanvas();
  }

  // public randomPos() {
  //   this.generateRandomPos();
  // }

  public updateCanvas() {
    this.redrawCanvas;
    this.drawElementsOnCanvas();
    this.hoverBorderOnShip('#f7f7f7');
    this.toggleBorderOnShips('yellow');
    this.drawBullet();
  }

  private drawCanvas(): void {
    this.canvas.focus();
    const wrapper: HTMLElement | null = document.querySelector('.wrapper');

    if (wrapper) {
      wrapper.appendChild(this.canvasEl);
      if (this.ctxEl) {
        this.clearCanvas();
      }
    }
  }

  private clearCanvas(): void {
    this.ctxEl!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctxEl!.fillStyle = '#000';
    this.ctxEl!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  public drawElementsOnCanvas() {
    this.clearCanvas();
    this.matrix;
    this.drawShips();
  }

  private drawShips() {
    Ship.shipsInGame.forEach((ship: IShipParams) => {
      const shipCoord = ship.position;

      // Координаты центра корабля (вычисляем каждый раз новые. Те координаты, которые есть в параметрах корабля не подходят)
      const centerX =
        shipCoord.randomPosition.randomX + shipCoord.shipWidth / 2;
      const centerY =
        shipCoord.randomPosition.randomY + shipCoord.shipHeight / 2;

      // Создаём новый 2дПуть и присваиваем к свойству ship.rect
      // это нужно для более удобной проверки ховера, селекта корабля
      const shipRect = new Path2D();
      ship.rect = shipRect;

      shipRect.rect(
        shipCoord.randomPosition.randomX,
        shipCoord.randomPosition.randomY,
        shipCoord.shipWidth,
        shipCoord.shipHeight
      );

      // Сохраняем контекст канваса
      this.ctxEl!.save();
      // Переносим начало сис-мы координат на центр корабля
      this.ctxEl!.translate(centerX, centerY);
      // Вращение корабля по angle
      this.ctxEl!.rotate(ship.position.angle);
      // Рисуем кораблик
      this.ctxEl!.fillStyle = ship.color!;
      this.ctxEl!.fillRect(
        -shipCoord.shipWidth / 2,
        -shipCoord.shipHeight / 2,
        shipCoord.shipWidth,
        shipCoord.shipHeight
      );

      // Восстанавливаем контекст
      this.ctxEl!.resetTransform();
      this.ctxEl!.restore();
    });
  }

  public drawBullet() {
    if (this.bulletHandler.bullets && this.bulletHandler.bullets.length > 0) {
      this.bulletHandler.bullets.forEach((bullet) => {
        this.ctxEl!.save(); // Save the current canvas state
        // Set fill style for the bullet
        // console.log(bullet.x, bullet.y);
        // this.ctxEl!.translate(bullet.x, bullet.y);
        // this.ctxEl!.rotate(bullet.initialAngle);

        // Draw the bullet as a circle
        this.ctxEl!.fillStyle = 'yellow';
        this.ctxEl!.beginPath();
        this.ctxEl!.arc(
          bullet.x + bullet.width / 2,
          bullet.y + bullet.height / 2,
          bullet.width / 2,
          0,
          Math.PI * 2
        );
        this.ctxEl!.fill();
        // this.ctxEl!.stroke(bullet.rect);
        // this.ctxEl!.fill();

        this.ctxEl!.restore(); // Restore the previous canvas state
      });
    }
  }

  public toggleBorderOnShips(color: string) {
    for (let ship of Ship.shipsInGame) {
      const shipCoord = ship.position;

      if (ship.selected) {
        // Если корабль выбран, сохраняем контекст
        this.ctxEl!.save();

        // Вычисляем центр корабля
        const centerX =
          shipCoord.randomPosition.randomX + shipCoord.shipWidth / 2;
        const centerY =
          shipCoord.randomPosition.randomY + shipCoord.shipHeight / 2;

        // Переносим центр координат на центр корабля и вращаем
        this.ctxEl!.translate(centerX, centerY);
        this.ctxEl!.rotate(ship.position.angle);

        // граница
        this.ctxEl!.lineWidth = 2;
        this.ctxEl!.strokeStyle = color;

        // создаём Путь2д для бордера
        const borderRect = new Path2D();
        borderRect.rect(
          -shipCoord.shipWidth / 2,
          -shipCoord.shipHeight / 2,
          shipCoord.shipWidth,
          shipCoord.shipHeight
        );

        //  рисуем бордер
        this.ctxEl!.stroke(borderRect);

        // восстанавилваем контекст
        this.ctxEl!.restore();
      }
    }
  }

  public hoverBorderOnShip(color: string) {
    for (let ship of Ship.shipsInGame) {
      const shipCoord = ship.position;

      if (ship.isHover) {
        this.ctxEl!.save();

        const centerX =
          shipCoord.randomPosition.randomX + shipCoord.shipWidth / 2;
        const centerY =
          shipCoord.randomPosition.randomY + shipCoord.shipHeight / 2;

        this.ctxEl!.translate(centerX, centerY);
        this.ctxEl!.rotate(ship.position.angle);

        this.ctxEl!.lineWidth = 2;
        this.ctxEl!.strokeStyle = color;

        const borderRect = new Path2D();
        borderRect.rect(
          -shipCoord.shipWidth / 2,
          -shipCoord.shipHeight / 2,
          shipCoord.shipWidth,
          shipCoord.shipHeight
        );

        this.ctxEl!.stroke(borderRect);

        this.ctxEl!.restore();
      }
    }
  }
  // drawStatistics here

  private drawCoordinatedSystem() {
    const xLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const yLabels = Array.from({ length: 10 }, (_, i) => i + 1); // Creates [1, 2, ..., 10]

    if (this.isShowMatrix) {
      // Draw X and Y axes
      this.ctxEl!.beginPath();
      this.ctxEl!.moveTo(0, this.canvasWidth); // Start point for X-axis
      this.ctxEl!.lineTo(this.canvasWidth, this.canvasWidth); // End point for X-axis
      this.ctxEl!.moveTo(0, 0); // Start point for Y-axis
      this.ctxEl!.lineTo(0, this.canvasHeight); // End point for Y-axis
      this.ctxEl!.stroke();

      this.ctxEl!.fillStyle = 'white';

      // Draw X-axis labels
      xLabels.forEach((label, index) => {
        const xPosition = 5 + index * this.cellSize; // Adjust spacing as needed
        this.ctxEl!.fillText(label, xPosition, 10); // Draw label below the X-axis
      });

      // Draw Y-axis labels
      yLabels.forEach((label) => {
        const yPosition = (label * this.canvasHeight) / yLabels.length - 5; // Adjust spacing as needed
        this.ctxEl!.fillText(label.toString(), 5, yPosition); // Draw label to the left of the Y-axis
      });

      this.drawGridLines(
        this.canvasWidth,
        this.canvasHeight,
        xLabels.length,
        yLabels.length
      );
    } else {
      this.ctxEl!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  // Method to draw grid lines
  private drawGridLines(
    canvasWidth: number,
    canvasHeight: number,
    xCount: number,
    yCount: number
  ) {
    this.ctxEl!.strokeStyle = '#e0e0e0';
    this.ctxEl!.lineWidth = 1; // Light gray color for grid lines
    // Vertical grid lines
    for (let i = 0; i <= xCount; i++) {
      const xPosition = 0 + i * this.cellSize;
      this.ctxEl!.beginPath();
      this.ctxEl!.moveTo(xPosition, 0);
      this.ctxEl!.lineTo(xPosition, canvasWidth);
      this.ctxEl!.stroke();
    }

    // Horizontal grid lines
    for (let j = 0; j <= yCount; j++) {
      const yPosition = canvasHeight - j * this.cellSize;
      this.ctxEl!.beginPath();
      this.ctxEl!.moveTo(0, yPosition);
      this.ctxEl!.lineTo(canvasHeight, yPosition);
      this.ctxEl!.stroke();
    }
  }
}
