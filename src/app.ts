import express , { json } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes";
import { errorHandlerMiddleware } from "./middlewares";

const app = express();

app.use([json(), cors(), router, errorHandlerMiddleware]);

export default app;
