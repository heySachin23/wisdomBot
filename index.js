const { TwitterApi } = require('twitter-api-v2');
const app = require("express")();
const axios = require('axios');
require('dotenv').config()
const PORT = process.env.PORT || 8000;

const twitterClient = new TwitterApi({
    appKey : process.env.API_KEY,
    appSecret : process.env.API_SECRET,
    accessToken : process.env.ACCESS_TOKEN,
    accessSecret : process.env.ACCESS_SECRET
});

const requestURL = 'https://api.quotable.io/random?maxLength=200'

async function getQuote() {
    const response = await axios.get(requestURL)
    return response.data
}

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/postTweet", async (req, res) => {
    const data = await getQuote()
    const quote = data.content;
    const author = `author - ${data.author}.
    #quote Comment down your thoughts on this 👇`;
    await twitterClient.v1.tweetThread([quote, author]);
    res.status(200).send({ quote, author });
});
