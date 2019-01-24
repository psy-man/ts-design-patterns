interface State {
  handle(ctx: Context): void;
}

class FirstState implements State {
  handle(ctx: Context): void {
    console.log('FirstState');
    ctx.setState(new SecondState());
  }
}

class SecondState implements State {
  handle(ctx: Context): void {
    console.log('SecondState');
    ctx.setState(new FirstState());
  }
}


class Context {
  constructor(private state: State) {
  }

  setState(state) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

const context = new Context(new FirstState());

context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
