module Proxy1 {
  abstract class Image {
    abstract displayImage(): void;
  }

  class RealImage extends Image {
    filename!: string;

    public constructor(filename: string) {
      super();
      this.filename = filename;
      this.loadImageFromDisk();
    }

    displayImage(): void {
      console.log(`Displaying ${this.filename}`);
    }

    private loadImageFromDisk(): void {
      console.log(`Loading   ${this.filename}`);
    }
  }

  export class ProxyImage extends Image {
    filename!: string;

    image!: RealImage;

    public constructor(filename: string) {
      super();
      this.filename = filename;
    }

    public displayImage(): void {
      if (this.image == null) {
        this.image = new RealImage(this.filename);
      }
      this.image.displayImage();
    }
  }
}

const image = new Proxy1.ProxyImage('foto_sample');
image.displayImage();
