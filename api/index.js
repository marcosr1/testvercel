import app from "../src/app.js";

export default function handler(req, res) {
   try {
      return app(req, res);
      
   } catch ( error ) {
    console.error("Erro na função:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
   }
}