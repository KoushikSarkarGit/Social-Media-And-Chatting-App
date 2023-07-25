
const Usermodel = require('../Models/Usermodel')

const userRegistration = async (req, res) => {
    const { username, password, firstname, email, lastname } = req.body;





    try {
        const CreatedUser = await Usermodel.create({
            username,
            email,
            password,
            firstname,
            lastname,
        });

        return res.status(200).json(CreatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { userRegistration }