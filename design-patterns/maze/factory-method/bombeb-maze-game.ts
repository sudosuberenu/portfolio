import { Room } from "../room";
import { Wall } from "../wall";
import { BombedWall } from "./bombed-wall";
import { MazeGame } from "./maze-game";
import { RoomWithABomb } from "./room-with-bomb";

export class BombedMazeGame extends MazeGame {
  makeRoom(roomNumber: number): Room {
    return new RoomWithABomb(roomNumber);
  }

  makeWall(): Wall {
    return new BombedWall();
  }
}