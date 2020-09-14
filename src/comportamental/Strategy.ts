module Strategy1 {
  interface AlgoritmoOrdenacao {
    sort(): void;
  }

  class QuickSort implements AlgoritmoOrdenacao {
    sort() {
      console.log('QuickSort');
    }
  }

  class MergeSort implements AlgoritmoOrdenacao {
    sort() {
      console.log('MergeSort');
    }
  }

  class BubbleSorte implements AlgoritmoOrdenacao {
    sort() {
      console.log('BubbleSorte');
    }
  }

  class Vetor {
    algoritmo!: AlgoritmoOrdenacao;

    constructor(algoritmo: AlgoritmoOrdenacao) {
      this.algoritmo = algoritmo;
    }

    setAlgoritimo(algoritmo: AlgoritmoOrdenacao) {
      this.algoritmo = algoritmo;
    }

    ordernar() {
      this.algoritmo.sort();
    }
  }

  export class MyApp {
    static main() {
      const vetor: Vetor = new Vetor(new BubbleSorte());
      vetor.ordernar();

      vetor.setAlgoritimo(new QuickSort());
      vetor.ordernar();
    }
  }
}

// Strategy1.MyApp.main();

module Strategy2 {
  interface Formatter {
    outPutReport(context: context): void;
  }
  interface context {
    title: string;
    text: string[];
    formatter: Formatter;
  }

  class HtmlFormatter implements Formatter {
    outPutReport(context: context): void {
      console.log('<html>');
      console.log(' <head>');
      console.log(`<title>${context.title}</title>`);
      console.log(' </head>');
      console.log(' <body>');
      context.text.map((line) => console.log(`<p>${line}<p>`));
      console.log('</body>');
      console.log('</html');
    }
  }

  class PlainTextFormatter implements Formatter {
    outPutReport(context: context): void {
      console.log(`***** ${context.title} ****`);
      context.text.map((line) => console.log(line));
    }
  }

  class Report implements context {
    title!: string;

    text!: string[];

    formatter!: Formatter;

    constructor(formatter: Formatter) {
      this.title = 'Monthly Report';
      this.text = ['Things are going', 'really, really well.'];
      this.formatter = formatter;
    }

    setFormater(formater: Formatter) {
      this.formatter = formater;
    }

    outPutReport() {
      this.formatter.outPutReport(this);
    }
  }

  export class MinhaApp {
    static main() {
      const report: Report = new Report(new HtmlFormatter());
      report.outPutReport();

      report.setFormater(new PlainTextFormatter());
      report.outPutReport();
    }
  }

}

Strategy2.MinhaApp.main();
