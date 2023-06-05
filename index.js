// 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
const{ Configuration, OpenAIApi} = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const core =require('core')
const configuration = new Configuration({
    organization: "org-i16GdI3biVetsydNnhzCYRLs",
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey :"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"
});
const openai = new OpenAIApi(configuration);
const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended:true}))
const port = 3080

const app = express()
app.use(bodyParser.json())






app.post('/',async(req,res)=>{ 
    const{message} = reg.body;
    console.log(message,"message")
    const response = await openai.createCompletion({
        model: `${message}`,
        prompt:"Say this is a test ",
        max_tokens:100,
        temperature:0.5,
    
    });
    // console.log(response.data.choices[0].text)
res.json({
    // data: response.data
    message:response.data.choices[0].test,

data:message,

})
};
app.listen(port,()=>{
    console.log(`examlle app listion at http://localhost:${port}`)
}))