module Mememonto1 {
  class Vendedor {
    private nome!: string;

    private totalVendas: number = 0.0;

    constructor(nome: string, totalVendas: number) {
      this.nome = nome;
      this.totalVendas = totalVendas;
    }

    getNome(): string {
      return this.nome;
    }

    setNome(nome: string): void {
      this.nome = nome;
    }

    getTotalVendas(): number {
      return this.totalVendas;
    }

    setTotalVendas(totalVendas: number): void {
      this.totalVendas = totalVendas;
    }

    createMomento(): Memento {
      const m: Memento = new Memento(this.nome, this.totalVendas);
      return m;
    }

    restoreMomento(memento: Memento) {
      this.nome = memento.getNome();
      this.totalVendas = memento.getTotalVendas();
    }
  }

  class Memento {
    private nome: string = '';

    private totalVendas: number = 0.0;

    constructor(nome: string, totalVendas: number) {
      this.nome = nome;
      this.totalVendas = totalVendas;
    }

    getNome(): string {
      return this.nome;
    }

    setNome(nome: string) {
      this.nome = nome;
    }

    getTotalVendas(): number {
      return this.totalVendas;
    }

    setTotalVendas(totalVendas: number) {
      this.totalVendas = totalVendas;
    }
  }

  class VendasMemory {
    private memento!: Memento;

    public getMemento(): Memento {
      return this.memento;
    }

    setMemento(memento: Memento) {
      this.memento = memento;
    }
  }

  export class MinhaApp {
    static main() {
      // Cria objeto vendedor
      const vendedor: Vendedor = new Vendedor('João', 10000.0);

      console.log(`${vendedor.getNome()} - Total de vendas: ${vendedor.getTotalVendas()}\n`);

      // Salva estado interno
      const memory = new VendasMemory();
      memory.setMemento(vendedor.createMomento());

      // Altera os valores dos atributos do objeto vendedor
      vendedor.setNome('Pedro');
      vendedor.setTotalVendas(50000.0);

      console.log(`${vendedor.getNome()} - Total de vendas: ${vendedor.getTotalVendas()}\n`);

      // Restaura memento
      vendedor.restoreMomento(memory.getMemento());

      console.log(`${vendedor.getNome()} - Total de vendas: ${vendedor.getTotalVendas()}\n`);
    }
  }

}

Mememonto1.MinhaApp.main();
