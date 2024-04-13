const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./index.js'); //path to router file

const app = express();
app.use(bodyParser.json());
app.use('/login', userRouter);

describe('POST /login', () => {
    it('should respond with success for correct credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                name: 'enesh',
                email: 'enesh@example.com',
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('login successful');
    });

    it('should respond with error for incorrect credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                name: 'hh',
                email: 'hh@gmail.com',
                password: 'hhisme'
            });

        expect(response.statusCode).toBe(401);
        expect(response.text).toEqual('invalid email or password');
    });
});