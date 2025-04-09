const express = require('express');
const userRouter = require('./routes/userRouter.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const jwtChecker =require('./utilities/middlewares/jwtChecker.middleware.js');
const applicationRouter= require('./routes/applicationRouter.js');
const cors= require('cors');

app.use(cors());
dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// user router Routes
app.use('/', userRouter);

//application router Routes
app.use('/application', jwtChecker, applicationRouter);

//mognoose connection

const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {      
        console.log('MongoDB connected');
    }
    )
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    }
    );



    

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});