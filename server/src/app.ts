import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(router);

const url: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vsdrx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("useFindAndModify", false);
mongoose.connect(url, options)
.then(() => 
    app.listen(PORT, () => 
        console.log(`Server running on localhost:${PORT}`)
    )
)
.catch(error => {
    throw error;
});
