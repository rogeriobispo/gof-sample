module Command1 {
  abstract class Command {
    abstract execute(): void;

    abstract undo(): void;
  }

  class Calculadora {
    private valor: number = 0;

    getValor(): number {
      return this.valor;
    }

    setValor(valor: number): void {
      this.valor = valor;
    }
  }

  class Soma extends Command {
    calculadora!: Calculadora;

    numero!: number;

    constructor(calculadora: Calculadora, numero: number) {
      super();
      this.calculadora = calculadora;
      this.numero = numero;
    }

    execute(): void {
      this.calculadora.setValor(this.calculadora.getValor() + this.numero);
      console.log(this.calculadora.getValor());
    }

    undo(): void {
      this.calculadora.setValor(this.calculadora.getValor() - this.numero);
      console.log(this.calculadora.getValor());
    }
  }

  class Invoker {
    comandos: Command[] = [];

    current: number = 0;

    public compute(command: Command) {
      command.execute();
      this.comandos?.push(command);
      this.current += 1;
    }

    undo(levels: number) {
      for (let i = 0; i < levels; i += 1) {
        if (this.current > 0) {
          const command = this.comandos[this.comandos.length - 1];
          this.comandos.pop();
          command.undo();
        }
      }
    }
  }

 export class MinhaApp {
   static main() {
     const calculadora: Calculadora = new Calculadora();
     const invoker: Invoker = new Invoker();
     invoker.compute(new Soma(calculadora, 10));
     invoker.compute(new Soma(calculadora, 5));
     invoker.compute(new Soma(calculadora, 10));
     // Desfazer as duas últimas operações
     invoker.undo(2);
   }
 }
}

Command1.MinhaApp.main();
