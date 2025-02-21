import { createServer } from "node:http";
import { Request, Response } from "express";

import { app } from "./app.js";

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hello From Express Server! 😃", success: true });
});

(async () => {
  const PORT = process.env.PORT ?? 9000;
  const server = createServer(app);

  server.listen(PORT, () =>
    console.log(`server is listening: http://localhost:${PORT} 🔥`)
  );
})();
