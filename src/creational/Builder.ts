module Builder1 {
export abstract class SanduicheBuilder {
    abstract abrePao(): void;

    abstract insereIngredientes(): void;

    abstract fechaPao(): void;

    abstract getSanduiche(): Sanduiche;
}

  class Sanduiche {}

  class FishBurger extends Sanduiche {}
  class Hanburguer extends Sanduiche {}

  export class FishBuilder extends SanduicheBuilder {
     fishBurger: Sanduiche = new FishBurger()

     abrePao(): void {
       console.log('Abre pão de fishburguer');
     }

     insereIngredientes(): void {
       console.log('Insere filé de peixe');
     }

     fechaPao(): void {
       console.log('Fecha pão de fishburguer');
     }

     getSanduiche(): Sanduiche {
       console.log('FishBurger esta pronto');
       return this.fishBurger;
     }
  }

  export class HamburguerBuilder extends SanduicheBuilder {
    hamburguer: Sanduiche = new Hanburguer()

    abrePao(): void {
      console.log('Abre pão de hamburguer');
    }

    insereIngredientes(): void {
      console.log('Insere carne e queijo');
    }

    fechaPao(): void {
      console.log('Fecha pão de hamburguer');
    }

    getSanduiche(): Sanduiche {
      console.log('Hamburguer está pronto');
      return this.hamburguer;
    }
  }

  export class Cozinha {
    public fazSanduiche(builder: SanduicheBuilder): void {
      builder.abrePao();
      builder.insereIngredientes();
      builder.fechaPao();
    }
  }
}

const cozinha = new Builder1.Cozinha();

// builders
const s1: Builder1.SanduicheBuilder = new Builder1.HamburguerBuilder();
const s2: Builder1.SanduicheBuilder = new Builder1.FishBuilder();

cozinha.fazSanduiche(s1);
s1.getSanduiche();

cozinha.fazSanduiche(s2);
s2.getSanduiche();

module Builder2 {

  abstract class Transaction {
    abstract validate(): boolean;

    abstract debitate(): void;

    abstract perform(): void
  }

  export class Ted extends Transaction {
    source: string = 'origin';

    destine: string = 'destino';

    validate(): boolean {
      console.log('Validando transação');
      return true;
    }

    debitate(): void {
      console.log(`Debitando transação da conta ${this.source}`);
    }

    perform(): void {
      console.log(`Ted: enviando dinheiro para a conta ${this.destine}`);
    }
  }

  export class RecargaDeCelular extends Transaction {
    origin: string = 'origem'

    validate(): boolean {
      console.log('Validando');
      return true;
    }

    debitate(): void {
      console.log(`debitando ${this.origin}`);
    }

    perform(): void {
      console.log('Recarregando o celular');
    }
  }

  export class P2P extends Transaction {
    source: string = 'origem';

    destine: string = 'destino';

    validate(): boolean {
      console.log('Validando transação');
      return true;
    }

    debitate(): void {
      console.log(`Debitando transação da conta ${this.source}`);
    }

    perform(): void {
      console.log(`P2P: debitando ${this.source} creditando ${this.destine}`);
    }
  }

  export class Bank {
    static performTransaction(transaction: Transaction): void {
      transaction.validate();
      transaction.debitate();
      transaction.perform();
    }
  }
}
console.log('#########################################################');
const banco = Builder2.Bank;
const ted = new Builder2.Ted();
banco.performTransaction(ted);
const recargaDeCelular = new Builder2.RecargaDeCelular();
banco.performTransaction(recargaDeCelular);

module Builder3 {
  abstract class Casa {
    abstract fundamento(): void;

    abstract paredes(): void;

    abstract teto(): void;
  }

  export class Mansao extends Casa {
    fundamento(): void {
      console.log('Construindo fundamento da mansao');
    }

    paredes(): void {
      console.log('Construindo paredes da mansao');
    }

    teto(): void {
      console.log('Construindo teto da mansao');
    }
  }

  export class CasaDePobre extends Casa {
    fundamento(): void {
      console.log('Construindo fundamento da casadepobre.');
    }

    paredes(): void {
      console.log('Construindo parede da casadepobre.');
    }

    teto(): void {
      console.log('Construindo teto da casadepobre');
    }
  }

  export class Construtora {
    static construirCasa(casa: Casa) {
      casa.fundamento();
      casa.paredes();
      casa.teto();
    }
  }
}

const construtora = Builder3.Construtora;
const casadepobre = new Builder3.CasaDePobre();
const mansao = new Builder3.Mansao();
construtora.construirCasa(casadepobre);
construtora.construirCasa(mansao);
