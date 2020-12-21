import express from "express";
import path from "path";
import dotenv from "dotenv";
import route from "./src/routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// TODO add JWT

app.use("/v1", route);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server Error");
});

const port = process.env.PORT;
const env = process.env.NODE_ENV;
app.listen(port, () => {
  console.log(`server started on port ${port} (${env})`);
});
