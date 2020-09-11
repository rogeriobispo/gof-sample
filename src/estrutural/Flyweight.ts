module Flyweight1 {
  abstract class Figura {
    constructor() {

    }

    abstract desenha(cor: string): void;
  }

  class Linha extends Figura {
    constructor() {
      console.log('criou instancia de linha');
      super();
    }

    public desenha(cor: string): void {
      console.log(`Figura linha ${cor}`);
    }
  }

  class Oval extends Figura {
    private preenchido: boolean = false;

    constructor(preenchido: boolean) {
      super();
      this.preenchido = preenchido;
    }

    desenha(cor: string): void {
      if (this.preenchido) {
        console.log(`Figura oval preenchida ${cor}`);
      } else {
        console.log(`Figura oval não preenchida ${cor}`);
      }
    }
  }

  class FiguraFactory {
    private static figuras: Map<string, Figura> = new Map<string, Figura>();

    static getFigura(nome: string) {
      let fig = this.figuras.get(nome);

      if (fig !== undefined) return fig;

      if (nome === 'oval preenchida') fig = new Oval(true);
      if (nome === 'oval não preenchida') fig = new Oval(false);
      if (nome === 'linha') fig = new Linha();
      if (fig === undefined) return;
      this.figuras.set(nome, fig);
      return fig;
    }
  }

  export class MinhaApp {
    static main(): void {
      let f: Figura | undefined = FiguraFactory.getFigura('linha');

      if (f === undefined) return;

      f.desenha('amarela');

      f = FiguraFactory.getFigura('oval não preenchida');

      if (f === undefined) return;

      f.desenha('vermelha');

      f = FiguraFactory.getFigura('linha');

      if (f === undefined) return;

      f.desenha('vermelha');

      f = FiguraFactory.getFigura('linha');

      if (f === undefined) return;

      f.desenha('green');
    }
  }
}

Flyweight1.MinhaApp.main();
