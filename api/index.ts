import dotenv from 'dotenv';
dotenv.config();
import { server } from "./config/server";

// require('./config/database');

server.listen(8080, function () {
    console.log('HTTP server running on 8080');
});

export { server };
