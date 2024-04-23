import dotenv from "dotenv"
dotenv.config();
const config={
    port:process.env.PORT,
    MONGO_DB_CONNECTION_STRING:process.env.MONGO_URI,
    CLIENT_APP: process.env.CLIENT_APP || 'http://localhost:5173',
    
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    JWT_COOKIE_EXPIRES_IN:process.env.JWT_COOKIE_EXPIRES_IN
    
    
}
export default config;