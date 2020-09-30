abstract class Game {
  abstract initialize(): void;

  abstract startPlay(): void;

  abstract endPlay(): void;

  play(): void {
    this.initialize();
    this.startPlay();
    this.endPlay();
  }
}

class Futebol extends Game {
  initialize(): void {
    console.log('11 jogadores.');
  }

  startPlay(): void {
    console.log('Inicia a partida de futebol.');
  }

  endPlay(): void {
    console.log('Termina a partida de futebol.');
  }
}

class Basquete extends Game {
  initialize(): void {
    console.log('5 jogadores');
  }

  startPlay(): void {
    console.log('inicia a partida e basquete');
  }

  endPlay(): void {
    console.log('Termina a partida de basquete.');
  }
}

const game: Game = new Futebol();

game.play();

const game2: Game = new Basquete();

game2.play();
