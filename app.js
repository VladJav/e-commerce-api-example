require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`);
    });
};

start();