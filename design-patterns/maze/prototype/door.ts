import { Clonable } from "./clonable";
import { Room } from "./room";

export class Door implements Clonable<Door> {
  private room1: Room;
  private room2: Room;

  constructor(room1: Room, room2: Room) {
    this.room1 = room1;
    this.room2 = room2;
  }

  clone(): Door {
    return new Door(this.room1, this.room1);
  }

  initialize(room1: Room, room2: Room) {
    this.room1 = room1;
    this.room2 = room2;
  }
}