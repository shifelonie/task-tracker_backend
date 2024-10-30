import express from "express";
import cors from "cors";
import routes from "./routes/route.js";
import limiter from "./config/rate-limiter.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(limiter);
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`⚡ [server]: Server is running at http://localhost:${PORT}`);
});
