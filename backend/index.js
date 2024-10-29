import e from "express";
import { PORT } from "./config.js";
const app = e();

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
