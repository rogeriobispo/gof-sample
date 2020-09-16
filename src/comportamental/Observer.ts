import { uuid } from 'uuidv4';

module Observer1 {
  interface Carro {
    frente(): void;
    direita(): void;
    esquerda(): void;
    para(): void;
  }

  abstract class Observer {
    id: string = '';

    constructor() {
      this.id = uuid();
    }

    abstract update(observerble: Observable, action: string): void;
  }

  abstract class Observable {
    observers: Observer[] = []

    changed: boolean = false;

    addObserver(observer: Observer) {
      this.observers.push(observer);
    }

    deleteObserver(observer: Observer) {
      this.observers = this.observers.filter((obs) => obs.id === observer.id);
    }

    abstract mudarEstado(): void;

    notifyObservers(action: string) {
      this.observers.map((observer) => observer.update(this, action));
    }

    setChanged() {
      this.changed = true;
    }
  }

  class CarroPolicia extends Observer implements Carro {
    id: string = '';

    constructor() {
      super();
    }

    update(_:Observable, action: 'frente' | 'direita' | 'esquerda' | 'para'): void {
      ({
        frente: this.frente,
        direita: this.direita,
        esquerda: this.esquerda,
        para: this.para,

      }[action])();
    }

    frente(): void {
      console.log(`Viatura segue em frente ${this.id}`);
    }

    direita(): void {
      console.log('Viatura vira a direita');
    }

    esquerda(): void {
      console.log('Viatura vira a esquerda');
    }

    para(): void {
      console.log('Viatura para');
    }
  }

  class CarroRoubado extends Observable implements Carro {
    mudarEstado(): void {
      this.notifyObservers(this.acao);
      this.setChanged();
    }

    observers: Observer[] = [];

    acao: string = ''

    frente(): void {
      this.acao = 'frente';
      console.log('Carro roubado segue em frente');
      this.mudarEstado();
    }

    direita(): void {
      this.acao = 'direita';
      console.log('Carro roubado vira a direita');
      this.mudarEstado();
    }

    esquerda(): void {
      this.acao = 'esquerda';
      console.log('Carro roubado vira a esquerda');
      this.mudarEstado();
    }

    para(): void {
      this.acao = 'para';
      console.log('Carro roubado para');
      this.mudarEstado();
    }
  }

  export class MinhaApp {
    static main() {
      const carroPolicia: CarroPolicia = new CarroPolicia();
      const carroPolicia2: CarroPolicia = new CarroPolicia();
      const carroRoubado: CarroRoubado = new CarroRoubado();

      carroRoubado.addObserver(carroPolicia);
      carroRoubado.addObserver(carroPolicia2);
      carroRoubado.frente();
      carroRoubado.direita();
      carroRoubado.frente();
      carroRoubado.esquerda();
      carroRoubado.para();
    }
  }
}

Observer1.MinhaApp.main();
