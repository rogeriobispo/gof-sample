module Facade1 {
  class SubistemaUm {
    metodoUm() {
      console.log('Método do Subistema um.');
    }
  }

  class SubistemDois {
    metodoDois() {
      console.log('Método do Subistema Dois.');
    }
  }

  class SubistemaTres {
    metodoTres() {
      console.log('Método do Subistema tres.');
    }
  }

  class Facade {
    sis1!: SubistemaUm;

    sis2!: SubistemDois;

    sis3!: SubistemaTres

    constructor() {
      this.sis1 = new SubistemaUm();
      this.sis2 = new SubistemDois();
      this.sis3 = new SubistemaTres();
    }

    metodoA() {
      this.sis1.metodoUm(); // subsistema 1
      this.sis2.metodoDois(); // subsistema 2
      this.sis3.metodoTres(); // subsistema 3
    }

    metodoB() {
      this.sis3.metodoTres(); // subsistema 3
      this.sis2.metodoDois(); // subsistema 2
      this.sis1.metodoUm(); // subsistema 1
    }
  }

  export class MinhaApp {
    static main() {
      const facade: Facade = new Facade();
      facade.metodoA();
    }
  }
}

// Facade1.MinhaApp.main();
