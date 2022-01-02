const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log('call this');
    res.send({test:'hi'});
});

module.exports = router;