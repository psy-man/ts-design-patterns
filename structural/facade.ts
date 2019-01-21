class VideoFile {
  format: string;

  constructor(public name: string) {
    // just the naive way to get an extension
    this.format = name.split('.').pop();
  }

  toFile() {
    return this.name;
  }
}

abstract class Codec {
}

class OggCompressionCodec extends Codec {
}

class MPEG4CompressionCodec extends Codec {
}

class Compressor {
  constructor(private codec: Codec) {
  }

  compress(video: VideoFile) {
    console.log(`COMPRESSED with codec: ${this.codec.constructor.name}`);
    return new VideoFile(`compressed_${video.name}`);
  }
}


class VideoCompressor {
  static compress(file) {
    const video = new VideoFile(file);

    let codec: Codec;

    switch (video.format) {
      case 'mp4': {
        codec = new MPEG4CompressionCodec();
        break;
      }
      case 'ogg': {
        codec = new OggCompressionCodec();
        break;
      }
      default: {
        throw new Error(`${video.format} format is not supported!`);
      }
    }

    return new Compressor(codec).compress(video).toFile();
  }
}

const compressedFile = VideoCompressor.compress('test.mp4');
console.log(compressedFile);
