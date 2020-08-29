module AbstractFactory1 {
  class Som {}

  class TocaCd extends Som {}

  class Mp3Player extends Som {}

  class Roda {}

  class RodaSimples extends Roda {}

  class RodaLigaLeve extends Roda {}

  class Carro {
    roda: Roda = new Roda()

    som: Som = new Som()
  }

  abstract class CarroFactory {
    abstract montaRoda(): Roda

    abstract montaSom(): Som
  }

  class CarroLuxoFactory extends CarroFactory {
    montaRoda(): Roda {
      return new RodaLigaLeve();
    }

    montaSom(): Som {
      return new Mp3Player();
    }
  }

  class CarroPopularFactory extends CarroFactory {
    montaRoda(): Roda {
      return new RodaSimples();
    }

    montaSom(): Som {
      return new TocaCd();
    }
  }

  export class Montadora {
    public static montaCarro(tipo: 'luxo' | 'popular'): Carro {
      const carroFactory = {
        luxo: new CarroLuxoFactory(),
        popular: new CarroPopularFactory(),
      }[tipo];

      const carro: Carro = new Carro();
      carro.roda = carroFactory.montaRoda();
      carro.som = carroFactory.montaSom();
      return carro;
    }
  }
}

const carro1 = AbstractFactory1.Montadora.montaCarro('luxo');
console.log(carro1.som.constructor);
console.log(carro1.roda.constructor);

module AbstractFactory2 {
  class Sofa {}

  class TV {}

  class Casa {
    sofa: Sofa = new Sofa();

    tv: TV = new TV();
  }

  class SofaRetratil extends Sofa {}
  class SofaSimples extends Sofa {}

  class Tv32Polegadas extends TV {}
  class TvTelaCurva extends TV {}

  abstract class CasaFactory {
    abstract montaTv(): TV

    abstract montaSofa(): Sofa
  }

  class CasaDeLuxo extends CasaFactory {
    montaTv(): TV {
      return new TvTelaCurva();
    }

    montaSofa(): Sofa {
      return new SofaRetratil();
    }
  }

  class CasaDePobre extends CasaFactory {
    montaTv(): TV {
      return new Tv32Polegadas();
    }

    montaSofa(): Sofa {
      return new SofaSimples();
    }
  }

  export class construtora {
    static montarCasa(tipo: 'pobre' | 'rico'): Casa {
      const casafactory = {
        pobre: new CasaDePobre(),
        rico: new CasaDeLuxo(),
      }[tipo];
      const casa = new Casa();
      casa.sofa = casafactory.montaSofa();
      casa.tv = casafactory.montaTv();
      return casa;
    }
  }
}

const casa1 = AbstractFactory2.construtora.montarCasa('pobre');
console.log(casa1.sofa.constructor);
console.log(casa1.tv.constructor);

const casa2 = AbstractFactory2.construtora.montarCasa('rico');
console.log(casa2.sofa.constructor);
console.log(casa2.tv.constructor);
