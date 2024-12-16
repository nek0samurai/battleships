export interface IShipParams {
  // destroyer, cruiser, battleship
  position: {
    shipWidth: number;
    shipHeight: number;
    angle: number;
    moveAngle: number;
    randomPosition: {
      randomX: number;
      randomY: number;
    };
    shipCenterCoordinate: {
      x: number;
      y: number;
    };
  };

  selected: boolean;
  isHover: boolean;
  isMoving: boolean;
  isTurning: boolean;
  rect: Path2D;
  id?: string;
  color?: string;
  name?: string;

  maxDamage: number;
  maxEvasions: number;
  type: string;

  animationFrameId: number | null;
  weapons: {
    guns: number;
    damage: number;
    reload: number;
    isLoadedLeft?: boolean;
    isLoadedRight?: boolean;
  };
  mobility: {
    speed: number;
    evasion: number;
    velocity: number;
  };
  survivability: {
    health: number;
    armor: number;
  };
  shoot: {
    left: boolean;
    right: boolean;
  };
}
