const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const categoryTable = require('../model/category');
const employeeTable = require('../model/employee');
const conn = require('../model/conn');

// Admin login route
router.post('/adminlogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ loginStatus: false, Error: "Email and password are required" });
        }

        const token = jwt.sign(
            { role: "admin", email: email },
            "jwt_secret_key",
            { expiresIn: "1d" }
        );

        res.cookie('token', token, { httpOnly: true });

        res.json({ loginStatus: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ loginStatus: false, Error: "Internal server error" });
    }
});

// Add category route
router.post('/add_category', async (req, res) => {
    try {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ Status: false, Error: 'Category is required' });
        }

        const catTable = new categoryTable({ category });

        await catTable.validate();
        await catTable.save();

        res.status(200).json({ Status: true, message: 'Category added successfully' });
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ Status: false, message: 'Failed to add category', Error: err.message });
    }
});

router.get('/category', async (req, res) => {
    try {
        const allCategories = await categoryTable.find();
        res.json({ Status: true, message: 'Categories fetched successfully', Result: allCategories });
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ Status: false, Error: 'Failed to fetch categories' });
    }
});

// Image upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add employee route
router.post('/add_employee', upload.single('image'), async (req, res) => {
    try {
        const { name, email, password, salary, address, phone, category } = req.body;

        if (!name || !email || !password || !salary || !address || !phone || !category) {
            return res.status(400).json({ Status: false, message: 'All fields are required' });
        }

        if (!req.file) {
            return res.status(400).json({ Status: false, message: 'Image file is required' });
        }

        const image = req.file.filename;

        const empTable = new employeeTable({ name, email, password, salary, address, phone, category, image });

        await empTable.validate();
        await empTable.save();

        res.status(200).json({ Status: true, message: 'Employee added successfully' });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ Status: false, message: 'Failed to add employee', Error: err.message });
    }
});

router.get('/employees', async (req, res) => {
    try {
        const allEmployees = await employeeTable.find();
        res.json({ Status: true, message: 'Employee fetched successfully', Result: allEmployees });
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ Status: false, Error: 'Failed to fetch Employees' });
    }
});

router.get('/employees/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        const employee = await employeeTable.findById(_id);
        if (!employee) {
            return res.status(404).json({ Status: false, Error: "Employee not found" });
        }
        return res.json({ Status: true, Result: employee });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});

router.put('/edit_employee/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        const employee = await employeeTable.findByIdAndUpdate(_id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ Status: false, Error: "Employee not found" });
        }
        return res.json({ Status: true, Result: employee });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});

router.delete('/delete_employee/:_id', async (req, res) => {
    const id = req.params._id;
    try {
        const employee = await employeeTable.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ Status: false, Error: "Employee not found" });
        }
        return res.json({ Status: true, Result: employee });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});



// Count Data
// const Admin = require('../models/Admin');
// const Employee = require('../models/Employee');

router.get('/admin_count', async (req, res) => {
    try {
        const adminCount = await conn.countDocuments();
        return res.json({ Status: true, Result: adminCount });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
    }
});

router.get('/employee_count', async (req, res) => {
    try {
        const employeeCount = await employeeTable.countDocuments();
        return res.json({ Status: true, Result: employeeCount });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
    }
});

router.get('/salary_count', async (req, res) => {
    try {
        const totalSalary = await employeeTable.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$salary" }
                }
            }
        ]);
        return res.json({ Status: true, Result: totalSalary[0].total });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
    }
});

router.get('/admin_records',async(req,res)=>{
    try {
        const admin = await conn.find();
        return res.json({ Status: true, Result: admin });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
    }
})

// logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})
module.exports = router;

