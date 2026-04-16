const request = require('supertest');
const { expect } = require('chai');

// Make sure this matches your server's port
const PORT = process.env.PORT || 3000;

const SERVER_URL = `http://localhost:${PORT}`;
const STUDENT_EMAIL = "hard0261@algonquinlive.com";

describe('Products API Integration', () => {

  it('getAll to show all product', async () => {
    const testName = "getAll to show all product";
    try {
      const res = await request(SERVER_URL).get('/products');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');

      // Check if the first item has the required properties
      if (res.body.length > 0) {
        expect(res.body[0]).to.have.property('storeId');
        expect(res.body[0]).to.have.property('storeName');
        expect(res.body[0]).to.have.property('productId');
        expect(res.body[0]).to.have.property('productName');
        expect(res.body[0]).to.have.property('price');
      }

      // make sure have at least 5 products in the store
      expect(res.body.length).to.be.at.least(5);

      // This is the specific string automate.js will parse
      console.log(`${STUDENT_EMAIL} - ${testName} - 200 - PASSED`);
    } catch (err) {
      console.log(`${STUDENT_EMAIL} - ${testName} - FAILED`);
      throw err;
    }
  });

  it('retrieval of teammate store', async () => {
    const testName = "retrieval of teammate store";
    try {
      const res = await request(SERVER_URL).get('/teammate-products');

      // Check if the first item has the required properties
      if (res.body.length > 0) {
        expect(res.body[0]).to.have.property('storeId');
        expect(res.body[0]).to.have.property('storeName');
        expect(res.body[0]).to.have.property('productId');
        expect(res.body[0]).to.have.property('productName');
        expect(res.body[0]).to.have.property('price');
      }

      // make sure have at least 5 products in the store
      expect(res.body.length).to.be.at.least(5);
      expect(res.status).to.equal(200);

      console.log(`${STUDENT_EMAIL} - ${testName} - 200 - PASSED`);
    } catch (err) {
      console.log(`${STUDENT_EMAIL} - ${testName} - FAILED`);
      throw err;
    }
  });
});
