module Mediator1 {
  abstract class Mediator {
    public abstract enviaMensagem(remetente: string, destinatario: string, message: string): void;
  }

  abstract class Participante {
    private nome: string = ''

    mediator!: Mediator;

    constructor(nome: string, mediator: Mediator) {
      this.nome = nome;
      this.mediator = mediator;
    }

    getNome(): string {
      return this.nome;
    }

    setNome(nome: string): void {
      this.nome = nome;
    }

    getMediator(): Mediator {
      return this.mediator;
    }

    setMediator(mediator: Mediator): void {
      this.mediator = mediator;
    }

    abstract enviaMensagem(destinatario: string, message: string): void;

    abstract recebeMensagem(remetente: string, mesaggem: string): void;
  }

  class ParticipamenteImplementation extends Participante {
    enviaMensagem(destinatario: string, message: string): void {
      const mediator = this.getMediator();
      mediator.enviaMensagem(this.getNome(), destinatario, message);
    }

    recebeMensagem(remetente: string, mensagem: string): void {
      console.log(`${remetente} escreveu ${mensagem}`);
    }

    constructor(nome: string, mediator: Mediator) {
      super(nome, mediator);
    }
  }

  class ChatMediator extends Mediator {
    participantes: Map<string, Participante> = new Map<string, Participante>();

    palavrasProibidas: string[] = []

    constructor() {
      super();
      this.palavrasProibidas.push('xxxxx');
      this.palavrasProibidas.push('@!xxx.');
      this.palavrasProibidas.push('###@!');
    }

    registraParticipante(participante: Participante): void {
      if (!this.participantes.get(participante.getNome())) {
        this.participantes.set(participante.getNome(), participante);
      } else {
        console.log('Usuário já cadastrado');
      }
    }

    enviaMensagem(remetente: string, destinatario: string, mensagem: string): void {
      if (this.participantes.get(remetente) && this.participantes.get(destinatario)) {
        const participanteRemetente = this.participantes.get(remetente);
        const participanteDestinatario = this.participantes.get(remetente);

        if (this.palavrasProibidas.find((palavra) => mensagem.includes(palavra))) {
          participanteRemetente!.recebeMensagem('Mediador', 'Você escreveu uma mensagem contendo palavra impróprias.');
          return;
        }

        participanteDestinatario!.recebeMensagem(remetente, mensagem);
      }
    }
  }

  export class MinhaApp {
    static main() {
      const salachat = new ChatMediator();
      const joao: Participante = new ParticipamenteImplementation('João', salachat);
      const maria: Participante = new ParticipamenteImplementation('Maria', salachat);
      const carlos: Participante = new ParticipamenteImplementation('Carlos', salachat);
      const renato: Participante = new ParticipamenteImplementation('Renato', salachat);

      salachat.registraParticipante(joao);
      salachat.registraParticipante(maria);
      salachat.registraParticipante(carlos);
      salachat.registraParticipante(renato);
      joao.enviaMensagem('Maria', 'Olá Maria, tudo bem ?');

      maria.enviaMensagem('João', 'Oi tudo! E com você ?');

      carlos.enviaMensagem('Renato', 'Renato, você é um @!xxx.');

      joao.enviaMensagem('Maria', 'Você está no trabalho agora ?');
    }
  }
}

Mediator1.MinhaApp.main();
