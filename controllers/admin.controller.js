const Admin = require('../models/admin.model');

const adminController = {
    getAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching admins', error: err.message });
        }
    },
    createAdmin: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Kiểm tra nếu `username` và `password` bị thiếu
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            // Kiểm tra xem `username` đã tồn tại hay chưa
            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Admin already exists' });
            }

            // Tạo mới `Admin`
            const newAdmin = new Admin({ username, password });
            const savedAdmin = await newAdmin.save();
            res.status(201).json(savedAdmin);
        } catch (err) {
            res.status(500).json({ message: 'Error creating admin', error: err.message });
        }
    },
    deleteAdminById: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedAdmin = await Admin.findByIdAndDelete(id);
            if (!deletedAdmin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            res.status(200).json({ message: 'Admin deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting admin', error: err.message });
        }
    }


};

module.exports = adminController;
