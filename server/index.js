import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./config/Connection.js";
import TodoRoutes from "./routers/todoRouter.js";



const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());


app.use("", TodoRoutes);


app.listen(port, async () => {
    console.log("server started", port);
    
});

Connection();