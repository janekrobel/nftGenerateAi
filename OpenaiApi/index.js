const express = require('express');
const app = express();
const aiGenerate = require('./aiGenerate.js');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const path = require('path');


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

app.post('/', async (req,res) => {
    console.log(req.query.link);
    axios.get(req.query.link, {responseType: "arraybuffer"}).then(async (response)=>{
        let numFiles = 0;
        const png = PNG.sync.read(response.data);
        const pngBuffer = PNG.sync.write(png);
        const files = await fs.promises.readdir('./images');
        numFiles = files.length;
        fs.writeFileSync(`./images/${numFiles}.png`, pngBuffer);
        res.send(true);
    });
});

app.get('/:_id',(req,res) => {
    const filePath = path.join(__dirname, 'images', req.params._id + '.png');
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(filePath);
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
