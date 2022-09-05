//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import { User } from "./models.js";
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1473513",
  key: "515006e2c602c038a151",
  secret: "db9b2e70e9720e17cb97",
  cluster: "eu",
  useTLS: true,
});

//middleware'
app.use(express.json());
mongoose.connect(
  `mongodb+srv://admin:OJKL7hTrhhQ0TBVM@cluster0.3hc9b6u.whatsappdb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
//DB config
// const connection_url =
//   "mongodb+srv://admin:OJKL7hTrhhQ0TBVM@cluster0.3hc9b6u.whatsappdb.net/?retryWrites=true&w=majority";
// mongoose.connect(connection_url, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// ???
// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("DB connected");
//   const msgCollection = db.collection("messagecontent");
//   const changeStream = msgCollection.watch();
//   changeStream.on("change", (change) => {
//     console.log(change);
//   });
// });

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

// app.get("/messages/sync", (req, res) => {
//   Messages.find(dbMessage, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
    //console.log(req);
  });
});
//listen
app.post("/add/user", async (request, response) => {
  const user = new User(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Listening on  localhost: ${port}`));
