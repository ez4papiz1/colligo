const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const updateEmailRouter = require('./routes/updateEmail');

// Create an Express app
const app = express();

// Use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the updateEmailRouter
app.use('/updateEmail', updateEmailRouter);

// Mock Usermodel
jest.mock('./Models/Usermodel', () => ({
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
}));

describe('POST /updateEmail', () => {
    it('should update user email', async () => {
        const req = {
            session: { uid: '5' },
            body: { 'new-email': 'newemail@example.com' },
        };
        const res = {
            redirect: jest.fn(),
        };

        await updateEmailRouter(req, res);

        expect(res.redirect).toHaveBeenCalledWith('/AccountSettings');
        expect(req.session.status).toBe('email changed successfully');
    });

    it('should handle errors when updating email', async () => {
        const errorMessage = 'Error updating email';
        const req = {
            session: { uid: '5' },
            body: { 'new-email': 'newemail@example.com' },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Mock Usermodel.findOneAndUpdate to throw an error
        const mockError = new Error(errorMessage);
        require('./Models/Usermodel').findOneAndUpdate.mockRejectedValueOnce(mockError);

        await updateEmailRouter(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});