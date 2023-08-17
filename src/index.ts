import { App } from './structures/app';

const app = new App(3000);

(async function init() {
  await app.loadRoutes();
  app.start();
})();
