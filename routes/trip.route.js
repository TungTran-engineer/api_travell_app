const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');

// Route để hiển thị danh sách các chuyến đi
router.get('/', tripController.getTrips);

// Route để tạo mới chuyến đi
router.post('/create', tripController.createTrip);

// Route để hiển thị thông tin chi tiết và chỉnh sửa chuyến đi
router.get('/edit/:id', tripController.editTrip);

// Route để cập nhật chuyến đi
router.put('/update/:id', tripController.updateTrip);

// Route để xóa tất cả chuyến đi
router.delete('/delete/:id', tripController.deleteTripById);

module.exports = router;
