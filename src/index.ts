import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(8080, () => {
  console.log(`Server listening on http://localhost:8080`);
});
