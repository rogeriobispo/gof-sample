module Composite1 {
  abstract class Empregado {
    protected nome!: string;

    protected salario!: number;

    public constructor(nome: string, salario: number) {
      this.nome = nome;
      this.salario = salario;
    }

    public abstract print(): void;

    public abstract add(e: Empregado): void;

    public abstract remove(e: Empregado): void;
  }

  class Gerente extends Empregado {
    private listaSubordinados: Empregado[] = [];

    constructor(nome: string, salario: number) {
      super(nome, salario);
    }

    public add(e: Empregado): void {
      this.listaSubordinados.push(e);
    }

    public remove(e: Empregado): void {
      this.listaSubordinados.splice(this.listaSubordinados.indexOf(e), 1);
    }

    public print(): void {
      console.log(`${this.nome} $${this.salario}`);
      this.listaSubordinados.forEach((subordinado) => subordinado.print());
    }
  }

  class Programador extends Empregado {
    public print(): void {
      console.log(`${this.nome} $${this.salario}`);
    }

    public add(e: Empregado): void {
      console.log('não é possivel adicionar empregado subordinado de programador');
    }

    public remove(e: Empregado): void {
      console.log('não é possivel remover empregado subordinado de programador');
    }

    constructor(nome: string, salário: number) {
      super(nome, salário);
    }
  }

  export class MinhaApp {
    static Main() {
      const estag: Programador = new Programador('José', 900);
      const junior: Programador = new Programador('Pedro', 2900);
      const senior: Programador = new Programador('Ricardo', 3900);

      const g1: Gerente = new Gerente('João', 15000);
      const g2: Gerente = new Gerente('Maria', 15000);
      const g3: Gerente = new Gerente('Carlos', 15000);
      g1.add(estag);
      g1.add(junior);

      g2.add(senior);

      g3.add(g1);
      g3.add(g2);

      g3.print();
    }
  }
}
Composite1.MinhaApp.Main();
