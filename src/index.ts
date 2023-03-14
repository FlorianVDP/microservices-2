import express, {Express} from "express"
import cors from 'cors'
import * as dotenv from 'dotenv'
import {routes} from "./routes/index.routes";

dotenv.config()


const app: Express = express()
const port: number = 8080;
const corsOptions: { origin: string } = {
    origin: `http://localhost:${port}`
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', routes)

app.listen(port, async () => {
    console.log(`http://localhost:${port}/`);
});
