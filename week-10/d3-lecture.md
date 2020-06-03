# Advanced Topics in React Web Sockets

### Preamble

Final Projects!

Real Time communication ... using sockets: SocketIO


## Quick Review

HTTP

CLIENT              SERVER
request ===========> awesome, got it! (GET/POST)
       <=========== response
CONNECTION IS TERMINATED

SOCKETS (WEB SOCKETS) TCP

kinda snek game? - you're connected, and remain connected until you disconnect

CLIENT                           SERVER
<-------CONNECTION ESTABLISHED-------->

## Building websocket

`mkdir server`, `mkdir client`

`npm init`

`touch server.js`
`npm i express`

setup very basic express server and wrap http and express
### server.js
```
const express = require('express');
// STEP 1 require socket.io
const socketio = require('socket.io');
// STEP 2 still have request response with server, not just web socket
const http = requite('http');
const PORT = 8080

const app = express();
// STEP 3 wrap app with http
const server = http.createServer(app);

// STEP 4 wrap server above with socket
const io = socketio(server)

app.get('/', (req, res) => {
  res.json(status: 'ok')
})

// STEP 6 a line for client to connect and disconnect
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log("user has disconnected!");
    })
});

// STEP 5 server.listen instead of app.listen
server.listen(PORT, () => console.log('Server is listening on ', PORT))
```

Cannot GET/ indicates you are hitting a server (just doesn't have a route)

after route implemented, will see status: 'ok' 

[`socket.io`](https://www.npmjs.com/package/socket.io) - web socket framework

there's also: `wss` - this is closer to the metal, you have to build everything yourself

socket IO has more tooling, and is basically production ready

`npm i socket.io`

## Using io

`io` is the only thing communicating with the socket. everything else will be http

`io` has methods called `.on`

```
io.on('connection', (socket) => {
  console.log('a user connected')
})
```

## Client

we have a server and a way to connect to it, but we need to create clients

[`socket.io-client`](https://www.npmjs.com/package/socket.io-client)
`npm i socket.io-client`

App.js
```
import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';

// a line between client and server for connect
const ENDPOINT = 'http://localhost:8080'

// when everything is loaded, connect
useEffect(() => {
  const connection = socketIOclient(ENDPOINT)
}, [])

function App() {
  return (
    <div className="App">
        <h3>Users App</h3>
    </div>
  );
}

export default App;

```

## App: when someone connects, give them random name

- we're gonna need a random name generator (ikea name generator)
`npm i ikea-name-generator --save`


### emit - sending messages

(in server.js)
```
const users = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(ikea.getName(false));

    // made user name
    let user = ikea.getName(false)
    users.push(user);

    // we can add key to any object, so we add the username to socket object
    socket.user = user;

    // send user name to our connection client
    socket.emit('initial',{name: user});

    // when anyone connects, notify everyone who is connected, that someone else has connected
    socket.broadcast.emit('user_connected', {
      users
    })

    socket.on('greetings', data => {
        console.log("Message recieved");
        console.log(data);
    })


    socket.on('disconnect', () => {
        console.log("user has disconnected!");
        console.log('DISCONNECTED USER', socket.user)
        // if user disconnects, remove user from array
        let position = users.indexOf(socket.user)
        users.splice(position,1);
        io.emit('user_disconnected', {msg: 'someone has disconnected'})
    })
});
```

in App.js
```
import React, { useEffect, useState } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'

function App(){
const [name, setName] = useState('');
const [users, setUsers] = useState([]);

useEffect(() => {
  const connection = socketIOClient(ENDPOINT);
  connection.on('initial', (data) => {
    console.log(data);
    setName(data.name);

  })

  connection.on('user_connected', data => {
    setUsers(data.users)
  })

  connection.on('user_disconnected', data => {
    setUsers(data.users)
  })

  connection.emit('greetings', {msg: 'hi'});
}, [])

return (
    <div className="App">
        <h3>Users App</h3>
        <p>Our Name: {name}</p>
        <h3></h3>
        {users.map((u, key) => <li key=[key]>u<l/i>)}
    </div>
  );
}

export default App;

```

connection is now the method where we can recieve and send messages from and to server

categories that we set have to match
emit('category') -> send message
on('category') -> receive message

**look up socket.io emit cheat sheet**

send the connection.on to 

rails socket system is socket systems - there's a lot more to read up on 

go node js if you want realtime

if you have a rails app

build chat system in node - on a third, chat server

### More advice for final proj

rails new my_api --api
generates skeleton: controller, model, active record. You're not gonna serve views, you're gonna serve json objects

you're gonna have to figure out CORS problem
google "cors issue ruby on rails"

because you have app running on rails and node app, you have to whitelist or proxy list

access control allow origin

access control allow methods
access control allow 

if you want to deploy - netlify heroku, or netlify node or whatever

don't worry about making something super production worthy - you don't have time for load balancing. Don't worry about that level of detail

you'll be deploying in two dif:
deploy react into netlify, and back end to heroku or lenode 