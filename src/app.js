import express from "express";
import cors from "cors";
import denunciaRoutes from "./routes/denunciaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// prefixa todas as rotas com /hello
app.use("/api", denunciaRoutes);

export default app;