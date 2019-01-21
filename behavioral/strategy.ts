interface UploadStrategy {
  upload(): string;
}

class AmazonUploader implements UploadStrategy {
  upload(): string {
    return `Uploading data to Amazon...`;
  }
}

class AzureUploader implements UploadStrategy {
  upload(): string {
    return `Uploading data to Azure...`;
  }
}

class GoogleDriveUploader implements UploadStrategy {
  upload(): string {
    return `Uploading data to GoogleDrive...`;
  }
}


class Uploader {
  constructor(private strategy: UploadStrategy) {
  }

  upload() {
    return this.strategy.upload();
  }

  changeStrategy(strategy: UploadStrategy) {
    this.strategy = strategy;
  }
}


const uploader = new Uploader(new AmazonUploader());
console.log(uploader.upload());

uploader.changeStrategy(new AzureUploader());
console.log(uploader.upload());

uploader.changeStrategy(new GoogleDriveUploader());
console.log(uploader.upload());
