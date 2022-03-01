//Connection to monogoDB
import mongoose  from "mongoose";

import config from "./keys";

mongoose.connect(`mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URI}/${config.DB_NAME}`, {
    authSource : "admin",

    
})
    .then(db => console.log("DB is connected")) 
    .catch(err => console.error(err));

