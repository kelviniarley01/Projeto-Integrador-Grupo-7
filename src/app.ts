import express from 'express';
import { FreteController } from "./controllers/Frete"

export const app = express();
app.use(express.json());

FreteController();

app.listen(3000, () => {
  console.log("Aplicação no ar 🚀");
});