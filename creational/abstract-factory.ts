interface Button {
  onClick(): string;
}

class WinButton implements Button {
  onClick(): string {
    return 'WinButton was clicked';
  }
}

class MacButton implements Button {
  onClick(): string {
    return 'MacButton was clicked';
  }
}


interface CheckBox {
  isChecked(): boolean;
}

class WinCheckBox implements CheckBox {
  isChecked(): boolean {
    return false;
  }
}

class MacCheckBox implements CheckBox {
  isChecked(): boolean {
    return true;
  }
}


interface GUIFactory {
  createButton(): Button;

  createCheckBox(): CheckBox;
}


class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton();
  }

  createCheckBox(): CheckBox {
    return new WinCheckBox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckBox(): CheckBox {
    return new MacCheckBox();
  }
}

enum OSType {
  Win, Mac
}

function getFactory(os: OSType) {
  switch (os) {
    case OSType.Win:
      return new WinFactory();
    case OSType.Mac:
      return new MacFactory();
    default:
      throw new Error('Unknown OS type');
  }
}


const macFactory = getFactory(OSType.Mac);

const b1 = macFactory.createButton();
const cb1 = macFactory.createCheckBox();

console.log(b1.onClick());
console.log(cb1.isChecked());

const winFactory = getFactory(OSType.Win);

const b2 = winFactory.createButton();
const cb2 = winFactory.createCheckBox();

console.log(b2.onClick());
console.log(cb2.isChecked());
