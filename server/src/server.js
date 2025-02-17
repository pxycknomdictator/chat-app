import { createServer } from "node:http";
import { app } from "./app.js";


(async () => {
  const PORT = process.env.PORT ?? 4000;
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`server is running at: http://localhost:${PORT}`);
  });
})();
