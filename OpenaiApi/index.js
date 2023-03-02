const express = require('express');
const app = express();
const aiGenerate = require('./aiGenerate.js');
const cors = require('cors');
const { images } = require('./nftImages.json');
const axios = require('axios');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.get('/',(req,res) => {
    aiGenerate.getGeneratedNft(req.query.aiParams).then((_link) => {
        res.send(_link);
    });
});

app.post('/',(req,res) => {
    axios.get(req.query.link, {responseType: "array-buffer"}).then((response)=>{
        fs.writeFile();
        images.push(response.data);
    });  
})

app.get('/:_id',(req,res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(images[req.params._id]);
})

app.listen(3001); 