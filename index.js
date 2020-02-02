require('dotenv').config({ path : './.env.dev' });
const express = require ('express');
const router = require ('./router');
const app = express();

const { APP_PORT } = process.env;

app.use(express.json({limit : '10mb'}));
app.use(router);

app.listen(APP_PORT,()=> console.log(`Server is running at port ${APP_PORT}`));
