import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket Client</h2>

    <input id="jwt" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
    
  </div>
`



const inputJwt = <HTMLInputElement>document.querySelector('#jwt');
const buttonConnect = <HTMLButtonElement>document.querySelector('#btn-connect');

buttonConnect.addEventListener( 'click', () => {
  const trimmedJwt = inputJwt.value.trim();

  if ( trimmedJwt.length <= 0 ) return alert('Enter a valid jwt');

  connectToServer(trimmedJwt);
});
