const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.listen(8080, () => {
    console.log('server is listening at port 8080');
});
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use('/users', userRouter);
app.use('/auth', authRouter);