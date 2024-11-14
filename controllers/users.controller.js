const User = require('../models/users.model');

const userController = {
    // Lấy danh sách tất cả người dùng
    getuser: async (req, res) => {
        try {
            const users = await User.find(); // Lấy danh sách người dùng từ DB
            res.status(200).json(users); // Trả về danh sách người dùng
        } catch (err) {
            res.status(500).json({ message: 'Error fetching users', error: err.message });
        }
    },

    // Tạo mới một người dùng
    createuser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id); // Tìm người dùng theo ID
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user); // Trả về thông tin người dùng
        } catch (err) {
            res.status(500).json({ message: 'Error fetching user', error: err.message });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Tìm và cập nhật người dùng theo ID
            const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', updatedUser });
        } catch (err) {
            res.status(500).json({ message: 'Error updating user', error: err.message });
        }
    },

    // Xóa tất cả người dùng
    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id); // Xóa người dùng theo ID
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting user', error: err.message });
        }
    }
    
};

module.exports = userController;
