import "dotenv/config";
import app from "./server.js";

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`🚀 Auth Server listening on port ${port}`);
  console.log(`🔑 Auth endpoints available at /api/auth`);
});
