import express from 'express';
import fs from 'fs';

export class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    // this.app.set('view engine', 'ejs');

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public async loadRoutes() {
    const routePath = `${__dirname}/../routes`;
    const files = fs.readdirSync(routePath);

    for (const file of files) {
      try {
        const { router } = await import(`${routePath}/${file}`);
        if (!router) throw new Error(`No se exportó la ruta en ${file}`);
        this.app.use('/', router);
      } catch (error) {
        console.log(`Hubo un error al cagar el archivo ${file}`, error);
      }
    }
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

