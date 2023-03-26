require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

app.use(express.static('./public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.get('/', (req, res)=>{
    res.send("E-Commerce API");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
};

start();