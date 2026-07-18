import "dotenv/config";

import * as z from "zod";

const enveSchema = z.object({


//#--Server--
port: z.coerce.number().default(5000),
NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

//#mongodb atlas
MONGODB_URI: z.string().min(1,'mongodb uri required'),

//#--JWT Secrets--
JWT_ACCESS_SECRET: z.string().min(1,'jwt access secret required'),
JWT_REFRESH_SECRET: z.string().min(1,'JWT refresh secret required'),

JWT_ACCESS_EXPIRY: z.string().default('15m'),           
JWT_REFRESH_EXPIRY: z.string().default('7d'), 

//#--Cloudflare R2
R2_ACCOUNT_ID: z.string().min(1,'R2_ACCOUNT_ID'),
R2_ACCESS_KEY_ID: z.string().min(1, 'R2_ACCESS_KEY_ID is required'),
R2_SECRET_ACCESS_KEY: z.string().min(1, 'R2_SECRET_ACCESS_KEY is required'),
R2_BUCKET_NAME: z.string().default('cphub'),    
R2_ENDPOINT: z.string().min(1, 'R2_ENDPOINT is required'),


//#--Cors--
CLIENT_ORIGIN: z.string().default('http://localhost:5173')

});





 const validateEnv=()=>{

   const result= enveSchema.safeParse(process.env);
   if(result.success)return result.data;
   else {
    console.error('❌ Environment validation failed:');
    console.error(result.error.format());
   
    process.exit(1);
   }

}


export const env= Object.freeze(validateEnv());



