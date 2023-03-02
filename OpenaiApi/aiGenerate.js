const { OpenAIApi,Configuration } = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const config = new Configuration({
    apiKey: process.env.apiKey
});


const openai = new OpenAIApi(config);

exports.getGeneratedNft = async (aiProps) => {
    let text = aiProps;
    try{
        const response = await openai.createImage({
            prompt: aiProps,
            n: 1,
            size: "256x256"
        });
        console.log("sent");
        console.log(response.data.data[0].url)
        return response.data.data[0].url;
        
    }
    catch(err){
        console.log(err);
    }

    
}