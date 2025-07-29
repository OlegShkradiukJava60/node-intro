import http from "node:http";
import { compute } from "./service.ts";

const port = 3500;
const server = http.createServer();

server.listen(port, () => {
   console.log("listening on port " + port);
});

server.on("request", async (req, res) => {
   res.statusCode = 200;
   res.setHeader("Content-Type", "application/json");

   let data = "";

   for await (let chunk of req) {
      data += chunk;
   }

   try {
      const parsed = JSON.parse(data);

      if (
         typeof parsed.operation !== "string" ||
         typeof parsed.op1 !== "number" ||
         typeof parsed.op2 !== "number"
      ) {
         res.statusCode = 400;
         res.end(JSON.stringify({ error: "Invalid input structure" }));
         return;
      }

      const result = compute(parsed);
      res.end(JSON.stringify({ result }));

   } catch (e: any) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: e.message }));
   }
});
