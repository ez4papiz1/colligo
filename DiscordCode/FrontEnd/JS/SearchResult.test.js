const request = require('supertest');
const app = require('./index.js');

describe('GET /searchPage', () => {
  it('renders the search page successfully', async () => {
    const response = await request(app).get('/searchPage');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Search Page'); 
  });
});
describe('GET /searchResults', () => {
  it('renders the search results page successfully with servers data', async () => {
    const response = await request(app).get('/searchResults?serverName=testServer');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Results Page'); 
    expect(response.text).toContain('Server 1'); 
  });
});
