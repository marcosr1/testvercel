import express from "express";
import cors from "cors";
import helloRoutes from "./routes/helloRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// prefixa todas as rotas com /hello
app.use("/hello", helloRoutes);

export default app;