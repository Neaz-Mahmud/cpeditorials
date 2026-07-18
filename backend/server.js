import connectdb from "./config/db.js";
import { env } from "./config/env.js";
import app from "./app.js";
import logger from "./utils/logger.js";

const startServer = async () => {
  await connectdb();

  app.listen(env.port, () => {
    logger.info("server is running at port ", env.port);
  });
};

startServer();
