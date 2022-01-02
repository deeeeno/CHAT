const express = require('express');
const app = express();

/////Routers
const test = require('./Router/test');

app.use('/test',test);
//////

const PORT = 5000;
app.listen(PORT,()=> console.log(`OPEN PORT ${PORT}`));