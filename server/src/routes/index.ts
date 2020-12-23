export default (app: any, opts: any, done: any) => {
  app.post('/user', (req: any, res: any) => {
    req.log.info({ body: req.body }, 'parsed body');
    res.send({ x: 1, y: 'a' });
  });
  done();
};
