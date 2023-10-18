import { Door } from "./door";
import { Direction } from "./maze-game-original";
import { Wall } from "./wall";

export class Room {
  private roomNumber: number;

  constructor(roomNumber: number) {
    this.roomNumber = roomNumber;
  }

  setSide(direction: Direction, component: Wall | Door) {}
}