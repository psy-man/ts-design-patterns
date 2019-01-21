interface PrimaryNumbersInterface {
  isPrimary(number: number): boolean;
}

class PrimaryNumbersTable implements PrimaryNumbersInterface {
  numbers: Set<number>;

  constructor(private max: number) {
    this.numbers = this.buildEratosthenesSieve(max);
  }

  isPrimary(number: number): boolean {
    if (number > this.max) {
      throw new Error(`${number} is bigger then ${this.max}`);
    }
    return this.numbers.has(number);
  }

  private buildEratosthenesSieve(max: number): Set<number> {
    const data = new Array(max + 1).fill(true);
    const result = new Set();

    let i = 2;
    while (i ** 2 <= max) {
      if (data[i] === true) {
        let j = i ** 2;

        while (j <= max) {
          data[j] = false;
          j += i;
        }
      }

      i += 1;
    }

    for (let q = 2; q < data.length; q += 1) {
      if (data[q] === true) {
        result.add(q);
      }
    }

    return result;
  }
}

class PrimaryNumbersTableProxy implements PrimaryNumbersInterface {
  table: PrimaryNumbersTable = null;

  constructor(private max: number) {
  }

  isPrimary(number: number): boolean {
    if (this.table === null) {
      this.table = new PrimaryNumbersTable(this.max);
    }

    return this.table.isPrimary(number);
  }
}

console.time('init');
const pnt = new PrimaryNumbersTableProxy(10000000);
console.timeEnd('init');


console.time('using first time');
console.log(pnt.isPrimary(4235633));
console.timeEnd('using first time');

console.time('using after');
console.log(pnt.isPrimary(34123));
console.log(pnt.isPrimary(9898343));
console.log(pnt.isPrimary(997));
console.log(pnt.isPrimary(900233));
console.timeEnd('using after');
