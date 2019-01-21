abstract class Unit {
  baseDamage = 0;
  multiplier = 0;

  attack() {
    return this.baseDamage * this.multiplier;
  }
}


abstract class Soldier extends Unit {
  baseDamage = 1;
}

class RobotSoldier extends Soldier {
  multiplier = 5;
}

class AlienSoldier extends Soldier {
  multiplier = 10;
}


abstract class Cannon extends Unit {
  baseDamage = 3;
}

class BallistaCannon extends Cannon {
  multiplier = 5;
}

class TrebuchetCannon extends Cannon {
  multiplier = 10;
}


class Army extends Unit {
  private units: Unit[] = [];

  add(unit: Unit) {
    this.units.push(unit);
  }

  attack() {
    return this.units.reduce((acc, u) => acc + u.attack(), 0);
  }
}

const robot = new RobotSoldier();
console.log(robot.attack());

const army1 = new Army();
army1.add(new RobotSoldier());
army1.add(new RobotSoldier());
army1.add(new AlienSoldier());
army1.add(new AlienSoldier());
army1.add(new AlienSoldier());
army1.add(new BallistaCannon());
army1.add(new TrebuchetCannon());
army1.add(new TrebuchetCannon());
console.log(army1.attack());


const army2 = new Army();
army2.add(new RobotSoldier());
army2.add(new RobotSoldier());
army2.add(new RobotSoldier());
army2.add(new AlienSoldier());
army2.add(new AlienSoldier());
army2.add(new BallistaCannon());
army2.add(new BallistaCannon());
console.log(army2.attack());


if (army1.attack() > army2.attack()) {
  console.log('Army 1 won');
} else if (army2.attack() > army1.attack()) {
  console.log('Army 2 won');
} else {
  console.log('Dead heat');
}
