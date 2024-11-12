const express = require('express');
const router = express.Router();
var tripController = require('../controllers/trip.controller');

exports.gettrip = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách chuyến đi', error });
    }
};

// Tạo mới một chuyến đi
exports.createtrip = async (req, res) => {
    try {
        const newTrip = new Trip(req.body);
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi tạo chuyến đi', error });
    }
};

// Xóa tất cả các chuyến đi
exports.deleteAlltrips = async (req, res) => {
    try {
        await Trip.deleteMany();
        res.status(200).json({ message: 'Đã xóa tất cả các chuyến đi' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa các chuyến đi', error });
    }
};
module.exports = router;