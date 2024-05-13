import express, { Application, Response, Request } from "express";
import signup from "./router/signup";
const app: Application = express();

app.use(express.json());

app.use(signup);
app.listen(3000, () => {
  console.log("server run on port 3000");
});