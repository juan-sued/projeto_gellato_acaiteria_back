import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandlerMiddleware } from "./middlewares";


const app = express();


app.use([express.json(), cors(), router, errorHandlerMiddleware]);


export default app;
