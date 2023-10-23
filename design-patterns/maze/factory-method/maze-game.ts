import { Door } from "../door";
import { Maze } from "../maze";
import { Direction } from "../maze-game-original";
import { Room } from "../room";
import { Wall } from "../wall";

abstract class AMazeGame {
  abstract makeMaze(): Maze;
  abstract makeRoom(roomNumber: number): Room;
  abstract makeWall(): Wall;
  abstract makeDoor(room1: Room, room2: Room): Door;
}

export class MazeGame extends AMazeGame {
  makeMaze(): Maze { return new Maze() };
  makeRoom(roomNumber: number): Room { return new Room(roomNumber) };
  makeWall(): Wall { return new Wall() };
  makeDoor(room1: Room, room2: Room): Door { return new Door(room1, room2) };
  
  createMaze(): Maze {
    const maze: Maze = this.makeMaze();
    
    const room1: Room = this.makeRoom(1);
    const room2: Room = this.makeRoom(2);
    
    const door: Door = this.makeDoor(room1, room2)
          
    maze.addRoom(room1);
    maze.addRoom(room2);
          
    room1.setSide(Direction.North, this.makeWall());
    room1.setSide(Direction.East, door);
    room1.setSide(Direction.South, this.makeWall());
    room1.setSide(Direction.West, this.makeWall());

    room2.setSide(Direction.North, this.makeWall());
    room2.setSide(Direction.East, this.makeWall());
    room2.setSide(Direction.South, this.makeWall());
    room2.setSide(Direction.West, door);
          
    return maze;
  } 
}