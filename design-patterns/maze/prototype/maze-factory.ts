import { Door } from "./door";
import { Maze } from "./maze";
import { Room } from "./room";
import { Wall } from "./wall";

export abstract class MazeFactory {
  abstract makeMaze(): Maze;
  abstract makeWall(): Wall;
  abstract makeRoom(roomNumber: number): Room;
  abstract makeDoor(room1: Room, room2: Room): Door;
}