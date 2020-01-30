require('dotenv').config({ path : './.env.dev' });
const express = require ('express');
// const cors = require ('cors');
const app = express();
const router = require ('./router');

const { APP_PORT } = process.env;

// app.use(cors({ origin : 'http://localhost:3000' }));
app.use(express.json());
app.use(router);

app.listen(APP_PORT,()=> console.log(`Server is running at port ${APP_PORT}`));
