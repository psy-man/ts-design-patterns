interface Product {
  getSpec(): string;
}

class Phone implements Product {
  getSpec(): string {
    return `I'm Phone with diagonal of 6 inc.`;
  }
}

class Headphone implements Product {
  getSpec(): string {
    return `I'm Headphone with the volume of 120 db.`;
  }
}

export enum ProductType {
  Phone, Headphone
}

class Factory {
  public static createProduct(type: ProductType): Product {
    switch (type) {
      case ProductType.Phone:
        return new Phone();
      case ProductType.Headphone:
        return new Headphone();
      default:
        throw new Error('Unknown product type');
    }
  };
}

const phone = Factory.createProduct(ProductType.Phone);
const headphone = Factory.createProduct(ProductType.Headphone);


console.log(phone.getSpec());
console.log(headphone.getSpec());
