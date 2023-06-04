import { IMusicAPI } from "../../store/music/Musictype";

export interface IMusicList {
  musica: Nodo;
  sig: Nodo | null;
  ant: Nodo | null;
}

export class Nodo {
  prevoius: null | Nodo;
  value: IMusicAPI;
  next: null | Nodo;

  constructor(value: IMusicAPI) {
    this.prevoius = null;
    this.value = value;
    this.next = null;
  }
}

export class List {
  head: null | Nodo;
  tail: null | Nodo;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: IMusicAPI) {
    value.id = this.length + 1;
    const nodo = new Nodo(value);
    if (!this.head) {
      this.head = nodo;
      return this.length++;
    }
    this._push(this.head, nodo);
  }

  _push(current: null | Nodo, value: Nodo) {
    if (current === null) {
      this.head = value;
      return this.length++;
    }
    if (current.next === null) {
      current.next = value;
      value.prevoius = current;
      return this.length++;
    }
    this._push(current.next, value);
  }
}
