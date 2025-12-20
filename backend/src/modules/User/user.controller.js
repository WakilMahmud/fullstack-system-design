import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { UserServices } from './user.service.js';

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

export const UserControllers = {
    createStudent
};