import { Clonable } from "./clonable";

export class Wall implements Clonable<Wall> {
  clone(): Wall {
    return new Wall();
  }
}