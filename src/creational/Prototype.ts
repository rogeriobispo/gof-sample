module Prototype {
  interface Cloneable {
    clone(): this;
    desenha(): void;
  }
  abstract class NotaMusical implements Cloneable {
    public abstract desenha(): void;

    clone(): this {
      const clone = Object.create(this);
      return clone;
    }
  }

  export class Do extends NotaMusical {
    public desenha(): void {
      console.log('Dó');
    }
  }

  export class Re extends NotaMusical {
    public desenha(): void {
      console.log('Ré');
    }
  }

  export class Mi extends NotaMusical {
    public desenha(): void {
      console.log('Ré');
    }
  }

  export class Fa extends NotaMusical {
    public desenha(): void {
      console.log('Ré');
    }
  }

  export class Sol extends NotaMusical {
    public desenha(): void {
      console.log('Ré');
    }
  }

  export class La extends NotaMusical {
    public desenha(): void {
      console.log('Ré');
    }
  }

  export class Si extends NotaMusical {
    public desenha(): void {
      console.log('Ré');
    }
  }

  export class Partitura {
    static notas = {
      do: new Do(),
      re: new Re(),
      mi: new Mi(),
      fa: new Fa(),
      sol: new Sol(),
      la: new La(),
      si: new Si(),
    };

    static getNota(nome: 'do' | 're' | 'mi' | 'fa' | 'sol' | 'la' | 'si'): NotaMusical {
      const nota: NotaMusical = this.notas[nome];
      return nota.clone();
    }
  }
}

Prototype.Partitura.getNota('do').desenha();
Prototype.Partitura.getNota('re').desenha();
Prototype.Partitura.getNota('mi').desenha();
Prototype.Partitura.getNota('fa').desenha();
Prototype.Partitura.getNota('fa').desenha();
Prototype.Partitura.getNota('fa').desenha();
Prototype.Partitura.getNota('do').desenha();
Prototype.Partitura.getNota('re').desenha();
Prototype.Partitura.getNota('do').desenha();
Prototype.Partitura.getNota('re').desenha();
Prototype.Partitura.getNota('re').desenha();
Prototype.Partitura.getNota('re').desenha();
