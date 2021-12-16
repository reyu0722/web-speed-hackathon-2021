import http from 'http';

import { app } from './app';
import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

async function main() {
  const server = await app();

  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  server.listen(Number(process.env.PORT || 3000), '0.0.0.0', (err, address) => {
    console.log(`Listening on ${address}`);
  });
}

main().catch(console.error);
