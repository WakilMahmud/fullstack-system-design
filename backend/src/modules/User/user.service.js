import { User } from './user.model.js';
import { generateStudentId } from './user.utils.js';

const createStudentIntoDB = async (email) => {
    const userData = {
        id: await generateStudentId(),
        email
    };

    try {
        const newStudent = await User.create(userData);

        return newStudent;
    } catch (err) {
        throw new Error(err);
    }
};

export const UserServices = {
    createStudentIntoDB
};