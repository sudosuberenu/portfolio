import { Room } from "./room";

export class Maze {
  private rooms: Room[] = [];

  addRoom(room: Room) {
    this.rooms.push(room)
  }
}