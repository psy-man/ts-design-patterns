abstract class ActiveRecord {
  save() {
    if (this.validate()) {
      this.beforeSave();

      console.log('Saving model to DB...');

      this.afterSave();

      return true;
    }

    return false;
  }

  abstract validate(): boolean;

  beforeSave() {
  }

  afterSave() {
  }
}

class User extends ActiveRecord {
  validate(): boolean {
    return true;
  }

  beforeSave() {
    super.beforeSave();
    console.log('Before...');
  }

  afterSave() {
    super.afterSave();
    console.log('After...');
  }
}

const user = new User();
console.log(user.save() ? 'saved' : 'not valid');
