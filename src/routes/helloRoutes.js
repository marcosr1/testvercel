import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World! 🌎",
    ok: true
  });
});

export default router;