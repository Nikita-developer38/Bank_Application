const Admin = require("../Models/adminSchema")
const { authenticator } = require('otplib');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

authenticator.options = {
    step: 300,
    window: 1
};



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'nikitamurmure3835@gmail.com',
        pass: 'osiv hhzu sjxp wsza'
    }
})
let currentOtp = '';

const adminOtpSecrets = {};

exports.Admin = async (req, res) => {
    const { name, email, password, phone, address, bank_name, IFSC_code, otp } = req.body


    const hashPass = await bcrypt.hash(password, 10)

    const otpSecret = adminOtpSecrets[email];
    if (!otpSecret) {
        return res.status(400).json({ message: 'OTP secret not found' });
    }

    const mail = {
        from: process.env.nodemailerEmail,
        to: email,
        subject: 'huurreeeeeeeeeeeeeee',
        text: `Admin Registration successful`,
    };


    const isOtpValid = authenticator.check(otp, otpSecret);

    if (!isOtpValid) {

        return res.status(400).json({ message: 'Invalid OTP' });
    }

    try {
        const admin = await Admin.create({ name, email, password: hashPass, phone, address, bank_name, IFSC_code })
        delete adminOtpSecrets[email];
        await transporter.sendMail(mail);

        res.status(201).json({ message: "Admin Created Successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }


}


exports.otp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }


    otpSecret = authenticator.generateSecret();


    currentOtp = authenticator.generate(otpSecret);

    adminOtpSecrets[email] = otpSecret;
    const mailOptions = {
        from: process.env.nodemailerEmail,
        to: email,
        subject: 'Your OTP Code',
        text: `hello Admin Your OTP code is: ${currentOtp}`,
    };


    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully. Please check your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error });
    }

}


exports.login = async (req, res) => {
    try {


        const { email, password, otp } = req.body;



        const otpSecret = adminOtpSecrets[email];
        if (!otpSecret) {
            return res.status(400).json({ message: 'OTP secret not found' });
        }

        const isOtpValid = authenticator.check(otp, otpSecret);

        if (!isOtpValid) {

            return res.status(400).json({ message: 'Invalid OTP' });
        }




        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }


        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        const token = jwt.sign({ adminId: admin._id, isAdmin: true }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });


        delete adminOtpSecrets[email];


        res.status(200).json({ message: ' admin Login Successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }


}


exports.sendNotificationToAdmin = async (message) => {
    try {
        const admins = await Admin.find(); // Fetch all admins
        for (const admin of admins) {
            admin.notifications.push({ message });
            await admin.save();
        }
    } catch (error) {
        console.error('Error sending notification to admin:', error);
    }
};



exports.getAdmin = async (req, res) => {
    try {

        const admin = await Admin.find()
        res.status(200).json(admin);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}


exports.logOutAdmin = async (req, res) => {
    // You can perform additional cleanup here if needed
    res.status(200).json({ message: 'Logged out successfully' });
};
