import { Door } from "./door";
import { Maze } from "./maze";
import { Room } from "./room";
import { MazeFactory } from "./maze-factory";
import { Wall } from "./wall";

export class MazePrototypeFactory extends MazeFactory {
  private prototypeMaze: Maze;
  private prototypeRoom: Room;
  private prototypeWall: Wall;
  private prototypeDoor: Door;

  constructor(maze: Maze, wall: Wall, room: Room, door: Door) {
    super();
    this.prototypeMaze = maze;
    this.prototypeRoom = room;
    this.prototypeWall = wall;
    this.prototypeDoor = door;
  }

	makeMaze(): Maze {
    return this.prototypeMaze.clone();
  }

	makeWall(): Wall {
    return this.prototypeWall.clone();
  }

	makeRoom(numberRoom: number): Room {
    const roomCloned = this.prototypeRoom.clone();
    roomCloned.initialize(numberRoom);
    return roomCloned;
  }

	makeDoor(room1: Room, room2: Room): Door {
    const doorCloned = this.prototypeDoor.clone();
		doorCloned.initialize(room1, room2);
		return doorCloned;
  }
}