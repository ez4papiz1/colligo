// Using Jest along with jsdom to simulate DOM environment
test('hoverFunction applies correct style on mouseover', () => {
    document.body.innerHTML = `
      <div class="friend_list_module" onmouseover="hoverFunction()"></div>
    `;
    const module = document.querySelector('.friend_list_module');
    module.onmouseover();
    expect(module.style.border).toBe('3px solid grey');
  });
  
  // Simulate mouseout as well
  test('hoverFunction removes style on mouseout', () => {
    document.body.innerHTML = `
      <div class="friend_list_module" onmouseover="hoverFunction()" onmouseout="hoverFunction()"></div>
    `;
    const module = document.querySelector('.friend_list_module');
    module.onmouseover();
    module.onmouseout();
    expect(module.style.border).toBe('none');
  });

  // Using Jest along with socket.io-client
const io = require('socket.io-client');
const socketURL = 'http://localhost';

test('socket should connect and receive messages', done => {
  const client = io.connect(socketURL);

  client.on('connect', () => {
    client.on('receive-message2', message => {
      expect(message).toBe('Hello World');
      client.disconnect();
      done();
    });

    client.emit('send-message2', 'Hello World');
  });
});

describe('Friend Page Tests', () => {
    it('successfully loads', () => {
      cy.visit('../views/friend_page.ejs');
      cy.contains('You have no friends added.').should('not.exist');
      cy.get('.friend_list_module').should('have.length.at.least', 1);
    });

    it('sends and displays messages', () => {
      cy.get('#messageInput').type('Hello Friend');
      cy.get('form').submit();
      cy.get('#messageDisplayArea').should('contain', 'Hello Friend');
    });
  });
  