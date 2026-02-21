import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

const API_URL = "https://dummyjson.com/quotes/random";

app.get("/", (req, res) => {
    res.send("Server running, acess /api/quote")
})

app.get("/api/quote", async (req, res) => {
    try {
        const response = await axios.get(API_URL);

        const quote = {
            en: response.data.quote,
            author: response.data.author
        };
        res.json(quote);
    } catch (error) {
        console.error("Error fetching quote:", error.message);
        res.status(500).json({ error: "Error at query quote" });
    }
});

app.listen(PORT, () =>{
    console.log(`Port running on ${PORT}`)
})
