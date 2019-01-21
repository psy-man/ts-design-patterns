abstract class Observer {
  public abstract update(): void;
}

abstract class Subject {
  private observers: Observer[] = [];

  register(observer: Observer) {
    this.observers.push(observer);
  }

  unregister(observer: Observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify() {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}

class IntegerSubject extends Subject {
  private _state: number;

  get state(): number {
    return this._state;
  }

  set state(value: number) {
    this._state = value;
    console.log(`New state is: ${value}`);
    this.notify();
  }
}


class HexObserver extends Observer {
  constructor(protected subject: IntegerSubject) {
    super();
  }

  update(): void {
    console.log('Hex:', this.subject.state.toString(8));
  }
}

class BinaryObserver extends Observer {
  constructor(protected subject: IntegerSubject) {
    super();
  }

  update(): void {
    console.log('Bin:', this.subject.state.toString(2));
  }
}


const subject = new IntegerSubject();

const hex = new HexObserver(subject);
const binary = new BinaryObserver(subject);

subject.register(hex);
subject.register(binary);

subject.state = 12;

subject.unregister(hex);

subject.state = 18;
