module Decorator1 {
  abstract class Arvore {
    abstract showEnfeites(): void;
  }

  class ArvoreDeNatal extends Arvore {
    showEnfeites(): void {
      console.log('ArvoreDeNatal');
    }
  }

  abstract class Decoracao extends Arvore {
    private arvore!: Arvore;

    constructor(arvore: Arvore) {
      super();
      this.arvore = arvore;
    }

    showEnfeites() {
      this.arvore.showEnfeites();
    }
  }

  class Bola extends Decoracao {
    constructor(a: Arvore) {
      super(a);
    }

    showEnfeites() {
      super.showEnfeites();
      console.log('Bola, ');
    }
  }

  class Estrela extends Decoracao {
    constructor(a: Arvore) {
      super(a);
    }

    showEnfeites() {
      super.showEnfeites();
      console.log('Estrela, ');
    }
  }

  class PiscaPisca extends Decoracao {
    constructor(a: Arvore) {
      super(a);
    }

    showEnfeites() {
      super.showEnfeites();
      console.log('Pisca-pisca, ');
    }
  }

 export class MinhaApp {
   static main(): void {
     let a = new ArvoreDeNatal();

     a = new Bola(a);
     a = new Estrela(a);
     a = new Bola(a);
     a = new Bola(a);
     a = new Bola(a);
     a = new Bola(a);
     a = new PiscaPisca(a);
     console.log(a);

     a.showEnfeites();
   }
 }
}

// Decorator1.MinhaApp.main();

module Decorator2 {
  abstract class AbstractLogger {
    abstract log(): void
  }

  class Logger extends AbstractLogger {
    log() {
      console.log('I, ');
    }
  }
  abstract class ExpressLogger extends AbstractLogger {
    private logger!: AbstractLogger;

    constructor(logger: AbstractLogger) {
      super();
      this.logger = logger;
    }

    log(): void {
      this.logger.log();
    }
  }

  class LogTimeStamp extends ExpressLogger {
    constructor(logger: Logger) {
      super(logger);
    }

    log(): void {
      super.log();
      console.log(`${Date.now()} -`);
    }
  }

  class LogLevel extends ExpressLogger {
    level!: string;

    constructor(logger: AbstractLogger, level: string = 'debug') {
      super(logger);
      this.level = level;
    }

    log(): void {
      super.log();
      console.log(`${this.level} -`);
    }
  }

  class LogMessage extends ExpressLogger {
    message!: string;

    constructor(logger: AbstractLogger, message: string) {
      super(logger);
      this.message = message;
    }

    log(): void {
      super.log();
      console.log(`${this.message}`);
    }
  }

  export class MinhaApp {
    static main(): void {
      let logger: Logger = new Logger();
      logger = new LogTimeStamp(logger);
      logger = new LogLevel(logger, 'info');
      logger = new LogMessage(logger, 'Enviou post para o emits');
      logger.log();
    }
  }
}

Decorator2.MinhaApp.main();
