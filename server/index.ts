import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import {port} from "./lib/contants";

const app: Express = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Server is running on port: ${port}`))
} catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
}