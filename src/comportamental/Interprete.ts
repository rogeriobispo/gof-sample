abstract class Expressao {
  interpret(context: Contexto) {
    if (context.getInput().length === 0) return;

    if (context.getInput().startsWith(this.nove())) {
      context.setOutput(context.getOutput() + (9 * this.multiplicador()));
      context.setInput(context.getInput().substring(2));
    } else if (context.getInput().startsWith(this.quatro())) {
      context.setOutput(context.getOutput() + (4 * this.multiplicador()));
    	context.setInput(context.getInput().substring(2));
    } else if (context.getInput().startsWith(this.cinco())) {
      context.setOutput(context.getOutput() + (5 * this.multiplicador()));
      context.setInput(context.getInput().substring(1));
    }

    while (context.getInput().startsWith(this.um())) {
      context.setOutput(context.getOutput() + (1 * this.multiplicador()));
      context.setInput(context.getInput().substring(1));
    }
  }

  abstract um(): string;

  abstract quatro(): string;

  abstract cinco(): string;

  abstract nove(): string;

  abstract multiplicador(): number;
}

class Contexto {
  private input: string = '';

  private output: number = 0;

  constructor(input: string) {
    this.input = input;
  }

  getInput(): string { return this.input; }

  setInput(input: string): void { this.input = input; }

  getOutput(): number { return this.output; }

  setOutput(output: number): void { this.output = output; }
}

class Centena extends Expressao {
  um(): string { return 'C'; }

  quatro(): string { return 'CD'; }

  cinco(): string { return 'D'; }

  nove(): string { return 'CM'; }

  multiplicador(): number { return 100; }
}

class Dezena extends Expressao {
  um(): string { return 'X'; }

  quatro(): string { return 'XL'; }

  cinco(): string { return 'L'; }

  nove(): string { return 'XC'; }

  multiplicador(): number { return 10; }
}

class Milhar extends Expressao {
  um(): string { return 'M'; }

  quatro(): string { return ' '; }

  cinco(): string { return ' '; }

  nove(): string { return ' '; }

  multiplicador(): number { return 1000; }
}

class Unidade extends Expressao {
  um(): string { return 'I'; }

  quatro(): string { return 'IV'; }

  cinco(): string { return 'V'; }

  nove(): string { return 'IX'; }

  multiplicador(): number { return 1; }
}

const romano: string = 'MCMXXVIII';
const context = new Contexto(romano);

const tree: Expressao[] = [];

tree.push(new Milhar());
tree.push(new Centena());
tree.push(new Dezena());
tree.push(new Unidade());

tree.forEach((exp) => exp.interpret(context));

console.log(context.getOutput());
