import { bootstrapServerless } from '../../src/main';

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrapServerless());
  return server(event, context, callback);
};
