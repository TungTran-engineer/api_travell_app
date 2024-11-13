const Trip = require('../models/trip.model');

const tripController = {
    // Lấy danh sách tất cả các chuyến đi
    getTrips: async (req, res) => {
        try {
            const trips = await Trip.find(); // Lấy danh sách chuyến đi từ DB
            res.status(200).json(trips); // Trả về danh sách chuyến đi
        } catch (err) {
            res.status(500).json({ message: 'Error fetching trips', error: err.message });
        }
    },

    // Tạo mới một chuyến đi
    createTrip: async (req, res) => {
        try {
            const newTrip = new Trip(req.body);
            const savedTrip = await newTrip.save();
            res.status(201).json(savedTrip);
        } catch (err) {
            res.status(500).json({ message: 'Error creating trip', error: err.message });
        }
    },

    // Cập nhật thông tin chuyến đi
    updateTrip: async (req, res) => {
        try {
            const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTrip) {
                return res.status(404).json({ message: 'Trip not found' });
            }
            res.status(200).json(updatedTrip);
        } catch (err) {
            res.status(500).json({ message: 'Error updating trip', error: err.message });
        }
    },

    // Chỉnh sửa thông tin chuyến đi
    editTrip: async (req, res) => {
        try {
            const trip = await Trip.findById(req.params.id);
            if (!trip) {
                return res.status(404).json({ message: 'Trip not found' });
            }
            res.status(200).json(trip);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching trip data', error: err.message });
        }
    },

    // Xóa tất cả các chuyến đi
    deleteTripById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedTrip = await Trip.findByIdAndDelete(id); // Xóa chuyến đi theo ID
            if (!deletedTrip) {
                return res.status(404).json({ message: 'Trip not found' });
            }
            res.status(200).json({ message: 'Trip deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting trip', error: err.message });
        }
    }
    
};

module.exports = tripController;
