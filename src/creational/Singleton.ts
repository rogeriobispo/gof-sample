class Janela {
  private static janela: Janela;

  private constructor() {}

  public static getInstance(): Janela {
    if (this.janela === undefined) {
      console.log('criou uma instancia');
      this.janela = new Janela();
    }
    return this.janela;
  }
}

const janela1 = Janela.getInstance();
const janela2 = Janela.getInstance();
const janela3 = Janela.getInstance();
const janela4 = Janela.getInstance();
/**
 * sempre retorna o mesmo objecto
 * não permite duas instancias do mesmo objeto.
 *
 */
