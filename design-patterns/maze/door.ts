import { Room } from "./room";

export class Door {
  private room1: Room;
  private room2: Room;

  constructor(room1: Room, room2: Room) {
    this.room1 = room1;
    this.room2 = room2;
  }
}