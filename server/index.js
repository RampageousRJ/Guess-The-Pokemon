import express from "express";
import router from "./routes/game.routes.js"

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api/game", router);


app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")  
);