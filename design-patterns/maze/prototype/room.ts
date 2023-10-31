import { Clonable } from "./clonable";
import { Door } from "./door";
import { Direction } from "./maze-game-original";
import { Wall } from "./wall";

export class Room implements Clonable<Room> {
  private roomNumber: number;

  constructor(roomNumber: number) {
    this.roomNumber = roomNumber;
  }

  setSide(direction: Direction, component: Wall | Door) {}

  clone() {
    return new Room(this.roomNumber);
  }

  initialize(roomNumber: number) {
    this.roomNumber = roomNumber;
  }
}