module Adpater1 {
  abstract class Plug {
    abstract obtemEletricidade(): string;
  }

  export class PlugAmericano extends Plug {
    obtemEletricidade(): string {
      return 'Plug americano conectado á: ';
    }
  }

  class PlugBrasiliero extends Plug {
    obtemEletricidade(): string {
      return 'Plug brasileiro conectado á: ';
    }
  }

  abstract class Tomada<P> {
    abstract conecta(plug: P): string

    abstract getNomeRede(): string;
  }

  export class TomadaAmericana extends Tomada<PlugAmericano> {
    conecta(plug: PlugAmericano): string {
      return plug.obtemEletricidade() + this.getNomeRede();
    }

    getNomeRede(): string {
      return 'tomada americana';
    }
  }

  export class TomadaBrasileira extends Tomada<PlugBrasiliero> {
    conecta(plug: PlugBrasiliero): string {
      return `${plug.obtemEletricidade()} ${this.getNomeRede()}`;
    }

    getNomeRede(): string {
      return 'tomada brasileira';
    }
  }
  export class AdapterEUATOBrasil extends TomadaBrasileira {
    public conecta(plug: PlugAmericano): string {
      return `${plug.obtemEletricidade()} ${this.getNomeRede()}`;
    }
  }
}

// target;
const tomadaBras: Adpater1.TomadaBrasileira = new Adpater1.TomadaBrasileira();

// adpatado
const plugEUA: Adpater1.PlugAmericano = new Adpater1.PlugAmericano();

const tomadaModificada: Adpater1.AdapterEUATOBrasil = new Adpater1.AdapterEUATOBrasil();
const conection: string = tomadaModificada.conecta(plugEUA);
console.log(conection);

module Adpater2 {
 export class SensorXbox2 {
   conectarXbox2() {
     console.log('Um novo controle foi conectado ao sensor do xbox');
   }
 }

  export class SensorPS5 {
    conectarPS5() {
      console.log('Um novo controle foi conectado ao sensor do ps5');
    }
  }

  export class AdaptadorPS5ParaXbox2 extends SensorPS5 {
    private adaptee!: SensorXbox2;

    constructor(adaptee: SensorXbox2) {
      super();
      this.adaptee = adaptee;
    }

    public conectarPS5(): void {
      this.adaptee.conectarXbox2();
      console.log('But stadia wins!');
    }
  }

  export class ControlePS5 {
    private sensorAQueSeConecta!: SensorPS5

    conectar(sensor: SensorPS5): void {
      this.sensorAQueSeConecta = sensor;
      sensor.conectarPS5();
    }
  }
}

const adaptee = new Adpater2.SensorXbox2();
const target = new Adpater2.ControlePS5();

const adpter = new Adpater2.AdaptadorPS5ParaXbox2(adaptee);
target.conectar(adpter);
