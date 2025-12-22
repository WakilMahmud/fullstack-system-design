import { User } from './user.model.js';

class UserDAO {
    static async findAll() {
        return await User.find({});
    }

    static async createUser(user) {
        return await User.create(user);
    }
}

export default UserDAO;