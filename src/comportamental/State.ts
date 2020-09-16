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

// State1.MinhaApp.main();

module State2 {
  interface State {
    writeName(context: StateContext, name: string): void;
  }

  class LowerCaseState implements State {
    writeName(context: StateContext, name: string): void {
      console.log(name.toLowerCase());
      context.setState(new MultipleUpperCaseState());
    }
  }

  class MultipleUpperCaseState implements State {
    private count = 0;

    writeName(context: StateContext, name: string): void {
      console.log(name.toLowerCase());
      this.count += 1;
      if (this.count > 1) {
        context.setState(new LowerCaseState());
      }
    }
  }
  class StateContext {
    private state!: State;

    constructor() {
      this.state = new LowerCaseState();
    }

    setState(newState: State): void {
      this.state = newState;
    }

    writeName(name: string) {
      this.state.writeName(this, name);
    }
  }

  export class MyApp {
    static main() {
      const context = new StateContext();

      context.writeName('Monday');
      context.writeName('Tuesday');
      context.writeName('Wednesday');
      context.writeName('Thursday');
      context.writeName('Friday');
      context.writeName('Saturday');
      context.writeName('Sunday');
    }
  }
}

State2.MyApp.main();
