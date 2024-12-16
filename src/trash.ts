// public drawStatistic() {
//   const tableWrapper: HTMLElement | null = document.querySelector('.table');
//   const tableHeads = ['Ship Name', 'MAX DAMAGE', 'EVASION'];

//   const tableRows = Ship.shipsInGame.map((ship) => {
//     return `
//       <tr id="table-${ship.id}">
//         <td>${ship.name}</td>
//         <td class="data-maxdamage">${ship.maxDamage}</td>
//         <td class="data-maxevasions">${ship.maxEvasions}</td>
//       </tr>
//     `;
//   });

//   const table = `
//     <table class="minimalistBlack">
//       <thead>
//         <tr>
//           ${tableHeads.map((head) => `<th>${head}</th>`)}
//         </tr>
//       </thead>
//       <tbody>
//         ${tableRows}
//       </tbody>
//     </table>
//   `;

//   if (tableWrapper) tableWrapper.innerHTML = table;
// }
// private toggleShowMatrix(e: Event) {
//   e.preventDefault();
//   this.isShowMatrix = !this.isShowMatrix;
//   console.log(this.isShowMatrix);
// }

// private handleClick(e){
//   const data = this.eventHandler.clickMouseEvent(e)
// }

/*
   eventX, eventY - clicked mouse coordinates
  */
// private selectToggle(eventX: number, eventY: number) {
//   // for (let ship of Ship.shipsInGame) {
//   //   const shipCoordsAndWidth =
//   //     ship.position.randomPosition.randomX + ship.position.shipWidth;
//   //   const shipCoordsAndHeight =
//   //     ship.position.randomPosition.randomY + ship.position.shipHeight;
//   //   if (
//   //     eventX > ship.position.randomPosition.randomX &&
//   //     eventY > ship.position.randomPosition.randomY &&
//   //     eventX < shipCoordsAndWidth &&
//   //     eventY < shipCoordsAndHeight
//   //   ) {
//   //     ship.selected = !ship.selected; // Toggle selection
//   //     console.log(`Ship selected: ${ship.selected}`);
//   //   }
//   // }
//   // return null;
// }

// private get getIsGameOver(): boolean {
//   return this.gameOver;
// }

// private set setIsGameOver(value: boolean) {
//   this.gameOver = value;
// }

// private gameLoop() {
//   this.drawHelper.drawCanvas();

//   // Request next frame
//   if (!this.getIsGameOver) {
//     requestAnimationFrame(() => this.gameLoop());
//   }
// }

// private roundIteration() {
//   for (let i = 0; i < Ship.shipsInGame.length; i++) {
//     Ship.shipsInGame[i].shoot();
//   }
//   const roundDOM = document.querySelector('.roundValue');
//   if (roundDOM) {
//     roundDOM.innerHTML = this.round.toString();
//     if (this.getIsGameOver) {
//       roundDOM.innerHTML = 'WIN';
//     }
//   }
//   this.round += 1;
// }

// private isTheLastShip() {
//   if (Ship.shipsInGame.length < 2) {
//     this.setIsGameOver = true;
//   }
// }

// private ctxColor(x: number, y: number, w: number, h: number, color: string) {
//   this.ctxEl!.fillStyle = color;
//   this.ctxEl!.fillRect(x, y, w, h);
// }

// private clearShips() {
//   Ship.shipsInGame.forEach((ship: IShipParams) => {
//     const shipCoord = ship.position;

//     this.ctxEl!.clearRect(
//       shipCoord.randomPosition.randomX,
//       shipCoord.randomPosition.randomY,
//       shipCoord.shipWidth,
//       shipCoord.shipHeight
//     );
//   });
// }

// if (ship.shoot.left === true) {
//   shotDirectionAngle = -ship.position.angle; // Adjust for left shooting
//   this.x += speed * Math.cos(-this.initialAngle);
//   this.y += speed * Math.sin(-this.initialAngle); // Move up/down based on angle
// } else if (ship.shoot.right === true) {
//   shotDirectionAngle = ship.position.angle; // Use positive angle for right shooting
//   this.x += speed * Math.cos(this.initialAngle);
//   this.y += speed * Math.sin(this.initialAngle); // Move up/down based on angle
// }
