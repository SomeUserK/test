import { Router } from 'express';

export const router = Router();

router.use((req, res, next) => {
  console.log(
    'New log into /: ',
    [
      new Date().toTimeString(),
      req.url,
      req.method,
      req.ip,
      req.headers['user-agent'],
    ].join('\n'),
  );
  next();
});

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../views' });
  // res.render('index', { title: 'Express' });
});

