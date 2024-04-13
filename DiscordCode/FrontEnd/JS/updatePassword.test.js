const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const updatePasswordRouter = require('./routes/updatePassword');

// Create an Express app
const app = express();

// Use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the updatePasswordRouter
app.use('/updatePassword', updatePasswordRouter);

// Mock Usermodel
jest.mock('./Models/Usermodel', () => ({
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
}));

describe('POST /updatePassword', () => {
    it('should update user password', async () => {
        const req = {
            session: { uid: '5' },
            body: { 'current-password': 'oldPassword', 'new-password': 'newPassword' },
        };
        const res = {
            redirect: jest.fn(),
            session: {},
        };

        await updatePasswordRouter(req, res);

        expect(res.redirect).toHaveBeenCalledWith('/AccountSettings');
        expect(req.session.status).toBe('password changed successfully');
    });

    it('should handle errors when updating password', async () => {
        const errorMessage = 'Error updating password';
        const req = {
            session: { uid: '5' },
            body: { 'current-password': 'oldPassword', 'new-password': 'newPassword' },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            session: {},
        };

        // Mock Usermodel.findOneAndUpdate to throw an error
        const mockError = new Error(errorMessage);
        require('./Models/Usermodel').findOneAndUpdate.mockRejectedValueOnce(mockError);

        await updatePasswordRouter(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});