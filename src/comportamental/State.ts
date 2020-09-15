module State1 {
  interface Comportamento {
    exec(): void;
  }
  interface Ave {
    setComportamentoVoar(comportamento: Comportamento): void;
    voar(): void;
    setComportamentoGrasnar(comportamento: Comportamento): void;
    grasnar(): void;
  }

  class Grasnar implements Comportamento {
    exec(): void {
      console.log('Esta ave grasna');
    }
  }

  class NaoGrasnar implements Comportamento {
    exec(): void {
      console.log(' Esta ave não grasna');
    }
  }

  class NaoVoar implements Comportamento {
    exec(): void {
      console.log('Esta ave não voa :(');
    }
  }

  class Voar implements Comportamento {
    exec(): void {
      console.log('Esta ave voa!');
    }
  }

 class Pato implements Ave {
   comportatmentoVoar: Comportamento = new Voar();

   comportamentoGrasnar: Comportamento = new Grasnar();

   setComportamentoVoar(comportamento: Comportamento): void {
     this.comportatmentoVoar = comportamento;
   }

   voar(): void {
     this.comportatmentoVoar.exec();
   }

   setComportamentoGrasnar(comportamento: Comportamento): void {
     this.comportamentoGrasnar = comportamento;
   }

   grasnar(): void {
     this.comportamentoGrasnar.exec();
   }
 }

 export class MinhaApp {
   static main() {
     const pato: Pato = new Pato();
     pato.setComportamentoVoar(new NaoVoar());
     pato.voar();
     pato.grasnar();
   }
 }
}

State1.MinhaApp.main();
