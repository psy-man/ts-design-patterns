abstract class Handler {
  private handler: Handler = null;

  constructor(private req: number) {
  }

  setHandler(handler: Handler) {
    this.handler = handler;
  }

  operation(req: number, msg: string): void {
    if (req <= this.req) {
      return this.handleRequest(msg);
    }

    if (this.handler !== null) {
      return this.handler.operation(req, msg);
    }

    console.log(`No handler for: ${req}`);
  }

  abstract handleRequest(msg: string): void;
}


class FirstHandler extends Handler {
  handleRequest(msg: string): void {
    console.log(`FirstHandler: ${msg}`);
  }
}

class SecondHandler extends Handler {
  handleRequest(msg: string): void {
    console.log(`SecondHandler: ${msg}`);
  }
}

class ThirdHandler extends Handler {
  handleRequest(msg: string): void {
    console.log(`ThirdHandler: ${msg}`);
  }
}



const first = new FirstHandler(3);
const second = new SecondHandler(7);
const third = new ThirdHandler(24);

first.setHandler(second);
second.setHandler(third);

const reqs = [2, 7, 23, 34, 4, 5, 8, 3];

for (const req of reqs) {
  first.operation(req, `operation fired: ${req}`);
}
