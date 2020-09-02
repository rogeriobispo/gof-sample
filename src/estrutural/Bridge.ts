module Bridge {
  abstract class Implementador {
    abstract opImpl(): void;
  }

  export abstract class Professor {
    protected imp: Implementador = new ProfessorImplGraduacao();

    constructor(imp: Implementador) {
      this.imp = imp;
    }

    public abstract op(): void;
  }

 export class ProfessorGraduacao extends Professor {
   constructor(imp: Implementador) {
     super(imp);
   }

   public op(): void {
     console.log('Olá');
     this.imp.opImpl();
   }
 }

  export class ProfessorImplGraduacao extends Implementador {
    public opImpl(): void{
      console.log('Implementação Prof. Gradução');
      console.log('Tchau');
    }
  }

  export class ProfessorImplPosGraduacao extends Implementador {
    public opImpl(): void {
      console.log('Implementação Prof. Pós-Gradução');
    }
  }

  class ProfessorPosGraduacao extends Professor {
    constructor(imp: Implementador) {
      super(imp);
    }

    public op(): void {
      this.imp.opImpl();
    }
  }
}

const grad: Bridge.Professor = new Bridge.ProfessorGraduacao(new Bridge.ProfessorImplGraduacao());
grad.op();

module Bridge2 {
  interface JanelaPadrao {
    desenharJanela(titulo: string): void;

    desenhaBotao(botao: string): void;

  }

  class JanelaAgendar implements JanelaPadrao {
    desenharJanela(titulo: string): void {
      console.log(`desenhando agendar janela: ${titulo}`);
    }

    desenhaBotao(botao: string): void {
      console.log(`desenha agendar botao: ${botao}`);
    }
  }

  export class JanelaImpressao implements JanelaPadrao {
    desenharJanela(titulo: string): void {
      console.log(`desenhando impressao janela: ${titulo}`);
    }

    desenhaBotao(botao: string): void {
      console.log(`desenha impressao botao: ${botao}`);
    }
  }

  class JanelaRevelacao implements JanelaPadrao {
    desenharJanela(titulo: string): void {
      console.log(`desenhando revelacao janela: ${titulo}`);
    }

    desenhaBotao(botao: string): void {
      console.log(`desenha revelacao botao: ${botao}`);
    }
  }

  abstract class Saida {
    protected saida: JanelaPadrao;

    constructor(janela: JanelaPadrao) {
      this.saida = janela;
    }

    desenharJanela(titulo: string): void {
      this.saida.desenharJanela(titulo);
    }

    desenhaBotao(botao: string): void {
      this.saida.desenhaBotao(botao);
    }

    abstract desenhar(): void;
  }

  class SaidaAgenda extends Saida {
    constructor(janela: JanelaPadrao) {
      super(janela);
    }

    desenhar(): void {
      this.desenharJanela('Agenda de compromissos');
      this.desenhaBotao('Novo');
      this.desenhaBotao('Alterar');
      this.desenhaBotao('Excluir');
    }
  }

  export class SaidaImpressao extends Saida {
    constructor(janela: JanelaPadrao) {
      super(janela);
    }

    desenhar(): void {
      this.desenharJanela('Impressao Iniciada');
      this.desenhaBotao('OK');
    }
  }

  class SaidaRevelacao extends Saida {
    constructor(janela: JanelaPadrao) {
      super(janela);
    }

    desenhar(): void {
      this.desenharJanela('Revelando fotos');
      this.desenhaBotao('OK');
    }
  }
}

const impressao: Bridge2.SaidaImpressao = new Bridge2.SaidaImpressao(new Bridge2.JanelaImpressao());

impressao.desenhar();

module Bridge3 {
  interface Implementation {
    operationImplementation(): string
  }
  export class Abstraction {
    protected implementation!: Implementation;

    constructor(implementation: Implementation) {
      this.implementation = implementation;
    }

    public operation(): string {
      const result = this.implementation.operationImplementation();
      return `Abstraction: Base operation with:\n${result}`;
    }
  }

  export class ExtendedAbstraction extends Abstraction {
    public opartion(): string {
      const result = this.implementation.operationImplementation();
      return `Abstraction: Base operation with:\n${result}`;
    }
  }

  export class ConcreteImplementationA implements Implementation {
    operationImplementation(): string {
      return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    }
  }

  export class ConcreteImplementationB implements Implementation {
    operationImplementation(): string {
      return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    }
  }
}

const implementation = new Bridge3.ConcreteImplementationA();
const abstraction: Bridge3.Abstraction = new Bridge3.Abstraction(implementation);
console.log(abstraction.operation());

const imp2 = new Bridge3.ConcreteImplementationB();
const ab2 = new Bridge3.ExtendedAbstraction(imp2);
console.log(ab2.operation());
