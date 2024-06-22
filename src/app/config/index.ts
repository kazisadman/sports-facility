import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expire: process.env.ACCESS_TOKEN_EXPIRY || '1h',
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRY,
};
