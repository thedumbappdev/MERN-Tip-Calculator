import express from "express";
import cors from "cors";

cont app = express();
const PORT = 3000; // port where backend runs

app.use(express.json()); // instruct express to parse received data
app.use(cors()); // brings the cors into action

// basic route to check the api
app.get("/", (req, res) => {
    res.status(200).send("Route is working!");
});

// acutal processing of the data sent from frontend and returned back as json data
app.post("api/v1/calculateTip", (req, res) => {
    const amount = parseInt(req.body.amount);
    const tip = parseInt(req.body.tip);
    const toBePaid = amount * (tip / 100) + amount;
    res.status(200).json({toBePaid});
});

// port listen will bring express server up and running
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})