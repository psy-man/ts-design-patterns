class RoundPeg {
  constructor(private radius: number) {
    radius
  }

  getRadius() {
    return this.radius;
  }
}

class SquarePeg {
  constructor(private width: number) {
  }

  getWidth() {
    return this.width;
  }
}

class SquarePegAdapter extends RoundPeg {
  constructor(private peg: SquarePeg) {
    super(Math.sqrt(2 * peg.getWidth() ** 2) >> 1);
  }
}


class RoundHole {
  constructor(private radius: number) {
  }

  getRadius() {
    return this.radius;
  }

  fits(peg: RoundPeg): boolean {
    console.log(this.getRadius());
    console.log(peg.getRadius());
    return this.getRadius() >= peg.getRadius();
  }
}


const hole = new RoundHole(20);

const rPeg = new RoundPeg(15);
console.log(hole.fits(rPeg));

const smallSquarePeg = new SquarePeg(25);
const bigSquarePeg = new SquarePeg(36);

// incompatible
// hole.fits(smallSquarePeg)

const adaptedSmallSquarePeg = new SquarePegAdapter(smallSquarePeg);
const adaptedBigSquarePeg = new SquarePegAdapter(bigSquarePeg);

console.log(hole.fits(adaptedSmallSquarePeg));
console.log(hole.fits(adaptedBigSquarePeg));
