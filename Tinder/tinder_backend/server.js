import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Cards from "./dbCards.js";
//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.connection_url; //url got from mongodb, connection url. hide it

//middleware
app.use(express.json());
app.use(cors());
//db config
mongoose
  .connect(
    connection_url
    //   useNewUrlParser: true, //these are some parameters to make connection smooth
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
  )
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
//api end points
app.get("/", (req, res) => res.status(200).send("hello pooja")); //status code 200 success. //get info from db

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err); //status code 500 err. //post info into db
    } else {
      res.status(201).send(data); //success
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err); //status code 500 err. //post info into db
    } else {
      res.status(200).send(data);
    }
  });
});

// listener
app.listen(port, () => console.log(`listening on local host: ${port}`));
