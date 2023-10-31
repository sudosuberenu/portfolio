import { Clonable } from "./clonable";
import { Room } from "./room";

export class Maze implements Clonable<Maze> {
  private rooms: Room[] = [];

  addRoom(room: Room) {
    this.rooms.push(room)
  }

  clone(): Maze {
    return new Maze();
  }
}