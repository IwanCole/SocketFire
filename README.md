# SocketFire
Script to send user input at a socket. Useful for testing a connection when developing other apps.
Use the CLI for testing regular sockets, and the web interface for testing WebSockets.

### Usage
Use npm install to install the required dependencies. To run, use

```$ node SocketFire --ip=<Target IP Address> --port=<Target Port> ```

The IP address can be an IPv4 _or_ IPv6 string. Once connected, enter any input followed by return to fire at the socket. Use ```ctrl-c``` to disconnect.
##### To-Do:
- Better error handling, reconnecting on connection loss
- Use external file.txt as input to send
- Auto repeat sending
- Stress testing

## WebSockets
In the ```/websockets``` directory is a web interface for performing similar testing with WebSockets, instead of traditional Sockets. Basic functionality works: use the input boxes to specify an IP/domain, and a port.

<img src="https://github.com/IwanCole/SocketFire/blob/master/screenshot.png" width="650">

##### To-Do:
- Better error handling
- Clean up websocket lifecycle code
- Add more validation for IP and port
- Add "save console to .txt file" button
- Big stretch: Add Node backend to enable testing both WebSockets _and_ Sockets
