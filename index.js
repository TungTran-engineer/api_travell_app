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
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
}));

app.get('/image-proxy', async (req, res) => {
    const imageUrl = req.query.url; // Nhận URL ảnh từ query
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching image');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import mô hình Trip
const Trip = require('./models/trip.model');
app.use(express.urlencoded({ extended: true }));


// Các route khác
const adminRoute = require('./routes/admin.route');
const tripRoute = require('./routes/trip.route');
const userRoute = require('./routes/users.route');

app.use('/admin', adminRoute)
app.use('/user', userRoute);
app.use('/trip', tripRoute);

app.get('/trip/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id); 
        if (!trip) {
            return res.status(404).send('Trip not found');
        }
        res.json(trip);  // Trả về chuyến đi dưới dạng JSON
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).send('Internal server error');
    }
});

// Route chính
app.get('/', (req, res) => res.send('tung đang học Node.js'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
