import { handleDenuncia } from "../src/routes/denunciaRoutes.js";

export default async function handler(req, res) {
  try {
    // Chama a função da rota diretamente
    await handleDenuncia(req, res);
  } catch (error) {
    console.error("Erro na função:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}