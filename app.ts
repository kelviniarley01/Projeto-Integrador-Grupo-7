import express from 'express';

export const app = express();

app.listen(3000, () => {
  console.log("Aplicação no ar 🚀");
});