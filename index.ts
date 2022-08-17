import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./src/router/router";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/case_study_4`)
    .then(() => {
        console.log('connect success');
    }).catch((err) => {
        console.log(err);
    })

app.use('', router)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);

})