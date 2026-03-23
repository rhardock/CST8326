const request = require('supertest');
const app = require('../server/server');

describe('Product/Food API Tests', () => {

    // Test Case 1: Validate GET /foods
    test('GET /foods should return 200 and a list of 5 items', async () => {
        const response = await request(app).get('/foods');

        // Assertions
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(5);

        // Check if the first item has the required properties
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('price');

        console.log('Test Passed: Received 5 food items.');
    });

    // Test Case 2: Validate 404 Handler
    test('GET /invalid-path should return 404 error', async () => {
        const response = await request(app).get('/invalid-path');

        expect(response.statusCode).toBe(404);
        console.log('Test Passed: 404 correctly handled.');
    });
});
