const {User,Chat,Message,Response} = require('../data/data');
const {createTopic,sendMessages} = require('../kafka/producer'); 
const express = require('express');
const router = express.Router();

//얘는 디비 정보를 조회해야 하는군. 현재는 디비가 없으므로 리스트에서 조사하는걸로
const topic_list = [{user:'dino',id:1,name:'테스트방',masterID:'dino',topic:'chatting-test1'}];


//GET /users/username/topics
//username인 유저가 속한 톡방 모두를 가져온다.
router.get('/:username/topics',(req,res)=>{
    const lists = topic_list.filter((ele)=>{
        if(ele.user == req.params.username) return ele;
    });
    if(lists == undefined){
        res.send(new Response('error',`There is no USERNAME[${req.params.username}]`));
    }else{
        res.send(new Response('success',lists));
    }
});

module.exports = router;