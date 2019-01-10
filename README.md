# SocketFire
Script to send user input at a socket. Useful for testing a connection when developing other apps.

### Usage
Use npm install to install the required dependencies. To run, use

```$ node SocketFire --ip=<Target IP Address> --port=<Target Port> ```

The IP address can be an IPv4 _or_ IPv6 string.


##### To-DO:
- Better error handling, reconnecting on connection loss
- Use external file.txt as input to send
- Auto repeat sending
- Stress testing
