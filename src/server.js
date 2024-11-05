import express from "express"
import cors from 'cors'
import "./db.js"; 

import adminRoute from './router/adminRoute.js'

const app = express();


app.use(cors());
// middleware 

app.use(express.json());


app.use("/api", adminRoute);

app.get("/", (req, res) => {
    return res.send("Hi Everyone")
})


const PORT = 3000;
app.listen(PORT, () => {console.log(`Server is running on this port ${PORT}`)});

