
import { DAOs } from '../../DAOs/index.js';
import { generateStudentId } from './user.utils.js';

const createStudentIntoDB = async (email) => {
    const userData = {
        id: await generateStudentId(),
        email
    };

    try {
        // const newStudent = await User.create(userData);
        const newStudent = await DAOs.UserDAO.createUser(userData);

        return newStudent;
    } catch (err) {
        throw new Error(err);
    }
};


const getAllStudentsFromDB = async () => {
    try {
        const students = await UserDAO.findAll();

        return students;
    } catch (err) {
        throw new Error(err);
    }
};

export const UserServices = {
    createStudentIntoDB,
    getAllStudentsFromDB
};