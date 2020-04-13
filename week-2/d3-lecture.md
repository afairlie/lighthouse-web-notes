# Networks

## TCP
*Transmission Control Protocol*

[TCP Documentation](https://tools.ietf.org/html/rfc793)

- Reddit is HTTP(S) protocol
- HTTP is a subset of TCP 

TCP -- Transmission Control Protocol
- Client A (Agent) connects to a specific server
- Server hangs out and waits
- Client A sends a message ---> server ceives that message and figures out what to do with it
- Server still hangs out
- Client can stay online and do nothing.

## HTTP Protocol
*a subset of TCP*
- Client A connects to a server!
- Client ASKS for a server to do something (REQUEST)
=> request contains a lot of information
  - I am this (my address)
  - I am using this (my browser)
  - I want something (my request)
- Server decides to do something, and then it sends back something (RESPONSE)
- connection terminates

## Ports

- your port is a small business located in your IP address
- (your IP address is like the country where all your ports are located)
- every service you're running can only run on one port
  - if you're running a server on port 5000
  - you can't run another server also on port 5000
- famous ports 80 is web, 666 is Doom port LOL

* If I'm running a server on a specific port (3001), my port is occupied, but when the client accesses my port, their port (3001) is not occupied. 

## Server

*a server is a program that listens*

your computer can be a server. 

**Node Server Setup**

```
const net = require('net');
const server = net.createServer();



server.listen(3001, () =>{
    console.log("My server is on!!! Its running on port 3001");
});
```

## Client

*a client is a program that connects to server*

```
const net = require('net');

const connection = net.createConnection({
    host: '0.tcp.ngrok.io', // IP address                                   
    port: 16112
});
```
## IP
*local host IP* ( within your computer): ex. 127.0.0.1

*local network IP* (connected to your router): ex. 192.168.1.90

*public IP* (WAN): 135.23.222.148 | public IP is the address for my router. 

Port Forwarding - open a specific port (ie. 3001) on your own router (may also need to open firewall) so it knows to let clients into your house.

If you were hosting a server only on your local network - you don't have to open port, you can 

## Closing Notes
- servers don't remember who you are.
- sessions, cookies, and jwt do let servers track you

## TAKEAWAY

***Understand how you are sending and receiving data***

+look into TCP and HTTP, etc.