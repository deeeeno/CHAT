const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
/////Routers
const test = require('./Router/test');
const topics = require('./Router/topics');

app.use('/test',test);
app.use('/topics',topics);
//////

const PORT = 5000;
app.listen(PORT,()=> console.log(`OPEN PORT ${PORT}`));