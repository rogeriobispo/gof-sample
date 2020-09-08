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
// Composite1.MinhaApp.Main();

module Composite2 {
  abstract class Person {
    name!: string

    papel!: string

    constructor(name: string, papel: string) {
      this.name = name;
      this.papel = papel;
    }

    abstract print(): void

    abstract addByers(buyer: Person): void

    abstract listByers(): void;
  }

  class Seller extends Person {
    byers: Buyer[] = []

    print(): void {
      console.log(`Sou ${this.name} e ${this.papel}`);
      this.listByers();
    }

    addByers(buyer: Buyer): void {
      this.byers.push(buyer);
    }

    listByers() {
      this.byers.map((buyer) => buyer.print());
    }
  }

  class Buyer extends Person {
    buyers: User[] = []

    print(): void {
      console.log(`Sou ${this.name} e ${this.papel}`);
      this.listByers();
    }

    addByers(buyer: User): void {
      this.buyers.push(buyer);
    }

    listByers(): void {
      this.buyers.map((buyer) => buyer.print());
    }
  }

  class User extends Person {
    print(): void {
      console.log(`Sou ${this.name} e ${this.papel}`);
    }

    addByers(buyer: Person): void {
      console.log('User apenas compra');
    }

    listByers(): void {
      throw new Error('User apenas compra');
    }
  }

  export class MyApp {
    static Main() {
      const user1 = new User('Cliente 1', 'Apenas compro');
      const user2 = new User('Cliente 2', 'Apenas compro');
      const user3 = new User('Cliente 3', 'Apenas compro');

      const buyer1 = new Buyer('Comprador 1', 'compro e vendo');

      buyer1.addByers(user1);
      buyer1.addByers(user2);
      buyer1.addByers(user3);

      const saller = new Seller('Vendedor', 'apenas vendo');
      saller.addByers(buyer1);

      saller.print();
    }
  }

}

Composite2.MyApp.Main();
