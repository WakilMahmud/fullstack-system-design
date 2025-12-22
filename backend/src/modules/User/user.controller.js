import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { UserServices } from './user.service.js';
import { DTOs } from '../../DTOs/index.js';

const createStudent = catchAsync(async (req, res) => {
    const { email } = req.body;

    const result = await UserServices.createStudentIntoDB(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    });
});


const getAllStudents = catchAsync(async (req, res) => {
    const users = await UserServices.getAllStudentsFromDB();

    const usersDTO = users.map(user => new DTOs.UserDTO(user));

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved all students successfully',
        data: usersDTO
    });
});


export const UserControllers = {
    createStudent,
    getAllStudents
};