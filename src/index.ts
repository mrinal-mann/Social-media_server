// index.js
import { initServer } from "./app";

async function init() {
  const app = await initServer();
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/graphql");
  });
}

// Start the server
init().catch((error) => {
  console.error("Error starting the server:", error);
});
