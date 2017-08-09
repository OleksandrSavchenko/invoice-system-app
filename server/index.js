import Koa from 'koa';

const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(6000, () => console.log('Server started on localhost:6000'));