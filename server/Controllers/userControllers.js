const nodemailer = require('nodemailer');
const User = require("../Models/userSchema")
const { authenticator } = require('otplib');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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

const userOtpSecrets = {};

exports.userRegistration = async (req, res) => {

    const { name, email, password, phone, dob, address, otp } = req.body

    const hashPass = await bcrypt.hash(password, 10)

    const otpSecret = userOtpSecrets[email];
    if (!otpSecret) {
        return res.status(400).json({ message: 'OTP secret not found' });
    }

    const mail = {
        from: process.env.nodemailerEmail,
        to: email,
        subject: 'huurreeeeeeeeeeeeeee',
        text: `Registration successful`,
    };


    const isOtpValid = authenticator.check(otp, otpSecret);

    if (!isOtpValid) {

        return res.status(400).json({ message: 'Invalid OTP' });
    }
    try {
        const user = await User.create({ name, email, password: hashPass, phone, dob, address });
        delete userOtpSecrets[email];
        await transporter.sendMail(mail);
        res.status(201).json({ message: "Registration Successfull" })
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

exports.otp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }


    otpSecret = authenticator.generateSecret();


    currentOtp = authenticator.generate(otpSecret);

    userOtpSecrets[email] = otpSecret;
    const mailOptions = {
        from: process.env.nodemailerEmail,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${currentOtp}`,
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



        const otpSecret = userOtpSecrets[email];
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


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });


        delete userOtpSecrets[email];


        res.status(200).json({ message: 'Login Successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }


}



exports.AllUser = async (req, res) => {
    try {
        const response = await User.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login' });

    }
}


exports.logOut = async (req, res) => {
    // You can perform additional cleanup here if needed
    res.status(200).json({ message: 'Logged out successfully' });
};
