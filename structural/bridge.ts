enum PowerStatus {
  off, on
}

abstract class Device {
  private status: PowerStatus = PowerStatus.off;
  private volume = 100;

  isEnabled() {
    return this.status === PowerStatus.on;
  }

  setStatus(status: PowerStatus) {
    this.status = status;
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume: number) {
    this.volume = volume;
  }
}

class Tv extends Device {
}

class Radio extends Device {
}


class RemoteControl {
  constructor(protected device: Device) {
  }

  on() {
    this.device.setStatus(PowerStatus.on);
  }

  off() {
    this.device.setStatus(PowerStatus.off);
  }

  toggle() {
    if (this.device.isEnabled()) {
      this.off();
    } else {
      this.on();
    }
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 1);
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 1);
  }
}

const tv = new Tv();


const rc = new RemoteControl(tv);


rc.volumeDown();
rc.volumeDown();
rc.volumeDown();

rc.volumeUp();

rc.toggle();

console.log(rc);
