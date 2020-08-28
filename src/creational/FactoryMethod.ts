module FactoryMethod {
  abstract class Passagem {
     private origem: string = ''

     private destino: string = ''

     private dataHoraPartida: string = ''

     constructor(origem: string, destino: string, dataHoraPartida: string) {
       this.origem = origem;
       this.destino = destino;
       this.dataHoraPartida = dataHoraPartida;
     }

     public getorigem(): string {
       return this.origem;
     }

     public setorigem(origem: string): void {
       this.origem = origem;
     }

     public getDestino(): string {
       return this.destino;
     }

     public setDestino(destino: string): void {
       this.destino = destino;
     }

     public getdataHoraPartida(): string {
       return this.dataHoraPartida;
     }

     public setdataHoraPartida(dataHoraPartida: string): void {
       this.dataHoraPartida = dataHoraPartida;
     }

     public abstract exibeDetalhes(): void
  }
  class PassagemOnibusUrbana extends Passagem {
    constructor(origem: string, destino: string, dataHoraPartida: string) {
      super(origem, destino, dataHoraPartida);
    }

    public exibeDetalhes(): void {
      console.log(`Passagem de ônibus Urbano: ${this.getorigem()} para ${this.getDestino()} Data/Hora: ${this.getdataHoraPartida()}`);
    }
  }

  class PassagemOnibusInterestadual extends Passagem {
    constructor(origem: string, destino: string, dataHoraPartida: string) {
      super(origem, destino, dataHoraPartida);
    }

    public exibeDetalhes(): void {
      console.log(`Passagem de ônibus Interestadual: ${this.getorigem()} para ${this.getDestino()} Data/Hora: ${this.getdataHoraPartida()}`);
    }
  }

  interface Empresa {
    emitePassagem(origem: string, destino: string, dataHoraPartida: string): Passagem
  }

 export class EmpresaOnibusUrbano implements Empresa {
   emitePassagem(origem: string, destino: string, dataHoraPartida: string): Passagem {
     return new PassagemOnibusUrbana(origem, destino, dataHoraPartida);
   }
 }
 export class EmpresaOnibusInterestadual implements Empresa {
   emitePassagem(origem: string, destino: string, dataHoraPartida: string): Passagem {
     return new PassagemOnibusInterestadual(origem, destino, dataHoraPartida);
   }
 }

}

const empresa1 = new FactoryMethod.EmpresaOnibusInterestadual();
const empresa2 = new FactoryMethod.EmpresaOnibusUrbano();

const passagem1 = empresa1.emitePassagem('São paulo', 'Bahia', '2020-12-20 18:00');
const passagem2 = empresa2.emitePassagem('Taboão', 'Paulista', '2020-08-28 18:00');

passagem1.exibeDetalhes();
passagem2.exibeDetalhes();

 module FactoryMethod2 {
   export interface Mensagem {
     enviar(mensagem: string): void;
   }

   export class MensageSMS implements Mensagem {
     public enviar(mensagem: string): void {
       console.log(`SMS: ${mensagem}`);
     }
   }

   export class MensagemEmail implements Mensagem {
     public enviar(mensagem: string): void {
       console.log(`Email: ${mensagem}`);
     }
   }

   export class MensagemWhatApp implements Mensagem {
     public enviar(mensagem: string): void {
       console.log(`whatApp: ${mensagem}`);
     }
   }

   export class MensagemTelegran implements Mensagem {
     public enviar(mensagem: string): void {
       console.log(`whatApp: ${mensagem}`);
     }
   }

   export class MessageFactory {
     public static getMensagem(kind: 'sms' | 'email' | 'whatsapp' | 'telegran'): Mensagem {
       return {
         sms: new MensageSMS(),
         email: new MensagemEmail(),
         whatsapp: new MensagemWhatApp(),
         telegran: new MensagemTelegran(),

       }[kind];
     }
   }
 }

const mensagem: FactoryMethod2.Mensagem = FactoryMethod2.MessageFactory.getMensagem('email');
mensagem.enviar('Ola mundo');

module FactoryMethod3 {
  export interface Logger {
    sendLOg(mensage: string): void
  }

  export class FileLogger implements Logger {
    sendLOg(mensage: string): void {
      console.log(`logging on file: ${mensage}`);
    }
  }

  export class DataDogLogger implements Logger {
    sendLOg(mensage: string): void {
      console.log(`logging on DataDog: ${mensage}`);
    }
  }

  export class RappidSevenLogger implements Logger {
    sendLOg(mensage: string): void {
      console.log(`logging on RappidSeven: ${mensage}`);
    }
  }

  export class LoggerFactory {
    public static getLogger(logger: 'file' | 'datadog' | 'rappid'): Logger {
      return {
        file: new FileLogger(),
        datadog: new DataDogLogger(),
        rappid: new RappidSevenLogger(),
      }[logger];
    }
  }

}

const logger1: FactoryMethod3.Logger = FactoryMethod3.LoggerFactory.getLogger('file');
logger1.sendLOg('ola infermeira');

const logger2: FactoryMethod3.Logger = FactoryMethod3.LoggerFactory.getLogger('datadog');
logger2.sendLOg('ola infermeira');

const logger3: FactoryMethod3.Logger = FactoryMethod3.LoggerFactory.getLogger('rappid');
logger3.sendLOg('ola infermeira');
