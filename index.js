const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb+srv://tunglatoi2004:tunglatoi2004@cluster0.4mxgk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors({
    origin: '*', // Cho phép tất cả các nguồn
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*' 
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const tripRoute = require('./routes/trip.route');
const userRoute = require('./routes/users.route');


app.use('/user', userRoute);
app.use('/trip', tripRoute);

// Route chính
app.get('/', (req, res) => res.send('tung đang học Node.js'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
