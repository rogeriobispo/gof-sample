module ChainOfREsponsability1 {

  abstract class TomadorDeDecisao {
    protected sucessor!: TomadorDeDecisao;

    setSucessor(sucessor: TomadorDeDecisao) {
      this.sucessor = sucessor;
    }

    abstract aprova(compra: Compra): void;
  }

  class Compra {
    valor: number = 0.0;

    constructor(valor: number) {
      this.valor = valor;
    }

    getValor(): number {
      return this.valor;
    }
  }

  class Diretor extends TomadorDeDecisao {
    aprova(compra: Compra): void {
      console.log(`Passou pela analise de ${Diretor.name}`);

      if (compra.getValor() < 10000) {
        console.log('Compra aprovada pelo diretor');
      } else if (this.sucessor != null) {
        this.sucessor.aprova(compra);
      }
    }
  }

  class Gerente extends TomadorDeDecisao {
    aprova(compra: Compra): void {
      console.log(`Passou pela analise de ${Gerente.name}`);

      if (compra.getValor() < 1000) {
        console.log('Compra aprovada pelo gerente');
      } else if (this.sucessor != null) {
        this.sucessor.aprova(compra);
      }
    }
  }

  class Presidente extends TomadorDeDecisao {
    aprova(compra: Compra): void {
      console.log(`Passou pela analise de ${Presidente.name}`);

      if (compra.getValor() < 100000) {
        console.log('Compra aprovada pela presidente');
      } else {
        console.log('Compra não aprovada');
      }
    }
  }

  class VicePresidente extends TomadorDeDecisao {
    aprova(compra: Compra): void {
      console.log(`Passou pela analise de ${VicePresidente.name}`);

      if (compra.getValor() < 30000) {
        console.log('Compra aprovada pelo Vice-Presidente.');
      } else if (this.sucessor != null) {
        this.sucessor.aprova(compra);
      }
    }
  }

  export class MinhaApp {
    static main() {
      const presidente: TomadorDeDecisao = new Presidente();
      const vicepresidente: TomadorDeDecisao = new VicePresidente();
      const diretor: TomadorDeDecisao = new Diretor();
      const gerente: TomadorDeDecisao = new Gerente();

      gerente.setSucessor(diretor);
      diretor.setSucessor(vicepresidente);
      vicepresidente.setSucessor(presidente);

      const compra: Compra = new Compra(5000);
      gerente.aprova(compra);
    }
  }
}

ChainOfREsponsability1.MinhaApp.main();

module ChainOfREsponsability2 {
  abstract class Transaction {
    nextStep!: Transaction;

    setNextStep(nextStep: Transaction): void {
      this.nextStep = nextStep;
    }

    abstract perform(): void;
  }

  class TransactionValidations extends Transaction {
    perform(): void {
      console.log('Validou a transação.');
      if (this.nextStep != null) this.nextStep.perform();
    }
  }

  class TransactionDebitAccount extends Transaction {
    perform(): void {
      console.log('Debitou conta: ');
      if (this.nextStep != null) this.nextStep.perform();
    }
  }

  class TransactionNotififyDestiny extends Transaction {
    perform(): void {
      console.log('Notificou conta de destino');
      if (this.nextStep != null) this.nextStep.perform();
    }
  }

  class TedTransactionCommand {
    static perform(valor: number) {
      const validation: Transaction = new TransactionValidations();
      const debitate: Transaction = new TransactionDebitAccount();
      const notify: Transaction = new TransactionNotififyDestiny();
      debitate.setNextStep(notify);
      validation.setNextStep(debitate);
      validation.perform();
    }
  }
  export class MyApp {
    static main() {
      TedTransactionCommand.perform(10);
    }
  }
}

ChainOfREsponsability2.MyApp.main();
