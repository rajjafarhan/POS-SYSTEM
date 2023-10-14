import * as dotenv from "dotenv";
dotenv.config(); // load .env file
// import config from './config'
import app from "./server";

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
