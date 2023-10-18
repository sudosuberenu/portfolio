import { Door } from "./door";
import { Maze } from "./maze";
import { Room } from "./room";
import { Wall } from "./wall";

export enum Direction {
  North,
  East,
  South,
  West
}

class MazeGame {
  createMaze(): Maze {
    const maze: Maze = new Maze();
    
    const room1: Room = new Room(1);
    const room2: Room = new Room(2);
    
    const door: Door = new Door(room1, room2);
          
    maze.addRoom(room1);
    maze.addRoom(room2);
          
    room1.setSide(Direction.North, new Wall());
    room1.setSide(Direction.East, door);
    room1.setSide(Direction.South, new Wall());
    room1.setSide(Direction.West, new Wall());

    room2.setSide(Direction.North, new Wall());
    room2.setSide(Direction.East, new Wall());
    room2.setSide(Direction.South, new Wall());
    room2.setSide(Direction.West, door);
          
    return maze;
  }
}