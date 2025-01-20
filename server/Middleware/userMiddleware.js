

exports.validateRegistration = (req, res, next) => {
    const { name, email, password, phone, dob, address, otp } = req.body;



    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: "Name is required and should be a non-empty string." });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }


    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number." });
    }


    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Phone number must be a valid 10-digit number." });
    }


    if (!dob) {
        return res.status(400).json({ message: "Date of birth is required." });
    }
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18) {
        return res.status(400).json({ message: "You must be at least 18 years old." });
    }

    if (!address || typeof address !== 'string' || address.trim().length === 0) {
        return res.status(400).json({ message: "Address is required and should be a non-empty string." });
    }


    if (!otp || !/^\d{6}$/.test(otp)) {
        return res.status(400).json({ message: "OTP must be a 6-digit number." });
    }

    next();
};
