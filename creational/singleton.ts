class Singleton {
  private static instance: Singleton = new Singleton();

  APP_VER = 12;
  DB_PATH = '/amazon...';

  // private constructor so that no instance is created
  private constructor() {
  }

  public static getInstance() {
    return this.instance;
  }
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1.APP_VER);
console.log(singleton1 === singleton2);
