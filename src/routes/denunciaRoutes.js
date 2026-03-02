import { Router } from "express";
import { criarDenuncia, listarDenuncias, updateStatus, votarDenuncia, updateImagem, deletarDenuncia } from "../controllers/denunciaController.js";
import { limiter, voteLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post("/denunciar", limiter, criarDenuncia);
router.patch("/votar/:id", voteLimiter, votarDenuncia);
router.patch("/status/:id", updateStatus);
router.patch("/imagem/:id", updateImagem);

router.delete("/:id", deletarDenuncia);

router.get("/", listarDenuncias);

export default router;