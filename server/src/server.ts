import express from "express";

const app = express();

app.get("/ads", (request, response) => {
  return response.json([
    { id: 1, anuncio: 1 },
    { id: 2, anuncio: 2 },
    { id: 3, anuncio: 3 },
    { id: 4, anuncio: 5 },
  ]);
});

app.listen(3333, () => {
  console.log("Server started 🎸");
});
