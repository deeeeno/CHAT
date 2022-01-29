const {User,Chat,Message,Response} = require('../data/data');
const {createTopic,sendMessages} = require('../kafka/producer'); 
const express = require('express');
const router = express.Router();

//얘는 디비 정보를 조회해야 하는군. 현재는 디비가 없으므로 리스트에서 조사하는걸로
const topic_list = [];

router.get('/:id',(req,res)=>{
    let topic = topic_list.find((ele)=>{
        if(ele.id == req.params.id) return ele;
    });
    
    if(topic == undefined){
        res.send(new Response('error',`There is no Topic ID[${req.params.id}]`));
    }else{
        res.send(new Response('success',topic));
    }
});

//POST /topics/{topicID}
//우선 별다른 옵션 없이 생성만 되도록 한다. 기타 옵션들은 추후 추가
router.post('/:id',(req,res)=>{
    let ret = createTopic(req.params.id);
    console.log(ret);
    if(ret == undefined){
        let new_topic = new Chat(req.params.id, req.body.name,req.body.masterID,req.params.id);
        console.log(new_topic);
        topic_list.push(new_topic);
        res.send(new Response('success',new_topic));
    }else{
        res.send(new Response('error',`Can't Make Topic ID[${req.params.id}]`));
    }
});

//delete는 kafka-node로 어떻게 요청할지 찾아봐야겠다.
router.delete('/:id',(req,res)=>{

});

router.post('/:id/messages',(req,res)=>{
    let msg = new Message(req.body.sender,req.body.message);
    let send_result = sendMessages(req.params.id,JSON.stringify(msg));
    sendMessages(req.params.id,JSON.stringify(msg)).then((result)=>{
        console.log('done');
        console.log('-----');
        console.log(result);
        console.log('-----');
        if(result.status == 'error'){
            res.send(new Response('error',result.data));
        }else{
            res.send(new Response('success',result.data));
        }
    })
})

module.exports = router;