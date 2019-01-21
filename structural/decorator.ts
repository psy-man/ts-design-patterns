abstract class Pizza {
  abstract getDescription(): string;

  abstract getCost(): number;
}

abstract class Decorator extends Pizza {
  constructor(public pizza: Pizza) {
    super();
  }
}

class CheeseDecorator extends Decorator {
  getCost(): number {
    return this.pizza.getCost() + 2.5;
  }

  getDescription(): string {
    return `${this.pizza.getDescription()}, Cheese`;
  }
}

class PeperoniDecorator extends Decorator {
  getCost(): number {
    return this.pizza.getCost() + 1.3;
  }

  getDescription(): string {
    return `${this.pizza.getDescription()}, Peperoni`;
  }
}

class Felichita extends Pizza {
  getCost(): number {
    return 10.00;
  }

  getDescription(): string {
    return 'Felichita Pizza';
  }
}

const pizza = new PeperoniDecorator(new CheeseDecorator(new Felichita()));

console.log(`${pizza.getDescription()} has a price of $${pizza.getCost()}`);
