import { Manager, Socket } from 'socket.io-client';
import { OnMessageFromServer, OnNewClients } from './interfaces';


export const connectToServer = () => {

  const manager = new Manager('http://localhost:3000');

  const socket = manager.socket('/');
  
  addListeners(socket);
};


const addListeners = ( socket: Socket ) => {

  const serverStatusHtml = <HTMLSpanElement>document.querySelector('#server-status');
  const clientListHtml = <HTMLUListElement>document.querySelector('#clients-ul');

  const formhtml = <HTMLFormElement>document.querySelector('#message-form');
  const messageInputHtml = <HTMLInputElement>document.querySelector('#message-input');

  const messagesListHtml = <HTMLInputElement>document.querySelector('#messages-ul');


  socket.on('connect', () => serverStatusHtml.innerHTML = 'Online' );
  socket.on('disconnect', () => serverStatusHtml.innerHTML = 'Offline');


  socket.on('new-clients', ({ connectedClients }: OnNewClients) => {
    let clients = '';

    connectedClients.forEach( clientId => {
      clients += `
        <li>${ clientId }</li>
      `;
    });

    clientListHtml.innerHTML = clients;
  });


  formhtml.addEventListener( 'submit', event => {
    event.preventDefault();

    if ( messageInputHtml.value.trim().length <= 0 ) return;

    socket.emit('message-from-client', { message: messageInputHtml.value });

    messageInputHtml.value = '';
  });


  socket.on('message-from-server', ({ message }: OnMessageFromServer) => {
    
    const li = document.createElement('li');
    li.innerHTML = `<strong>${ message }</strong>`;

    messagesListHtml.append(li);
  });

}
