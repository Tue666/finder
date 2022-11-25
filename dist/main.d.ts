import 'dotenv/config';
import serverless from 'serverless-http';
export declare const bootstrapServerless: () => Promise<serverless.Handler>;
export declare const handler: (event: any, context: any, callback: any) => Promise<any>;
