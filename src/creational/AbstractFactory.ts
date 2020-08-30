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

module AbstractFactory3 {
  class Window { }
  class MenuIcon { }

  class SO {
    window: Window = new Window()

    menuIcon: MenuIcon = new MenuIcon()
  }
  class MacWindow extends Window {}
  class LinuxWindow extends Window {}

  class MacMenuIcon extends MenuIcon {}
  class LinuxMenuIcon extends MenuIcon {}

  abstract class SistemaOperacionalFactory {
    abstract window(): Window

    abstract menuIcon(): MenuIcon
  }

  class MacOS extends SistemaOperacionalFactory {
    window(): Window {
      return new MacWindow();
    }

    menuIcon(): MenuIcon {
      return new MacMenuIcon();
    }
  }

  class LinuxOS extends SistemaOperacionalFactory {
    window(): Window {
      return new LinuxWindow();
    }

    menuIcon(): MenuIcon {
      return new LinuxMenuIcon();
    }
  }

  export class SistemaOperacional {
    static instalar(sistema: 'linux' | 'mac'): SO {
      const sistemaFactory = {
        linux: new LinuxOS(),
        mac: new MacOS(),
      }[sistema];
      const so = new SO();
      so.menuIcon = sistemaFactory.window();
      so.window = sistemaFactory.window();
      return so;
    }
  }
}

const so1 = AbstractFactory3.SistemaOperacional.instalar('linux');
console.log(so1.window.constructor);
const so2 = AbstractFactory3.SistemaOperacional.instalar('mac');
console.log(so2.window.constructor);
