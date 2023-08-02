const Usermodel = require('../Models/Usermodel')

const checkAdmin = async (curuseid) => {
    try {

        const user = await Usermodel.findById(curuseid);
        if (user.isAdmin !== true) {
            return false;
        } else {
            return true;
        }


    } catch (error) {
        console.log(error);
        return;
    }
};


module.exports = { checkAdmin }