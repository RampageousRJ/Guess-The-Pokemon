import express from "express";
import router from "./routes/game.routes.js"
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({
    "path": "./.env",
    "debug": true
});

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static("public"));

app.use("/api/game", router);


app.listen(process.env.PORT || 3030, () =>
    console.log(`Server running on http://localhost:${process.env.PORT || 3030}`)  
);

export default app;
