import express from "express";
import cors from "cors";
import response from "./utils/response.js";
import routesData from "./utils/routesData.js";
import mhsRoutes from "./routes/mhsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authentication from "./middleware/auth.js";
import errorHandler from "./middleware/errorHandler.js";
import apicache from "apicache";

const cache = apicache.middleware;
const app = express();

// app.use((req, res, next) => {
//   if (req.originalUrl.startsWith("/v1/mhs")) {
//     res.setHeader("Cache-Control", "public, max-age=300");
//   } else {
//     res.setHeader("Cache-Control", "no-cache");
//   }
//   next();
// });

app.use(cors());
app.use(express.json());
app.use("/v1/auth", authRoutes);
app.use("/v1/mhs", authentication, mhsRoutes);

app.get("/", (req, res) => {
  response(200, routesData, "Api Ready!!!", res);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

export default app;
