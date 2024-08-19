import express from "express";
import login from "./src/controller/controller.js";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json());

app.post("/createLogin", (req, res) => {
    login.createLogin(req, res); 
});

app.get("/login", (req, res) => {
    login.loginJWT(req, res); 
});

app.get("/selectlogin", (req, res) => {
    login.selectLogin(req, res); 
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
