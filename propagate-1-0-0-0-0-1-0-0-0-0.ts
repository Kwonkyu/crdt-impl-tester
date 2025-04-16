const timestampLog = (...msg: unknown[]) => {
  console.log(`${new Date().toLocaleString()}: ${msg}`);
}

const ws2 = new WebSocket('ws://localhost:8080/ws/counter/propagate');
ws2.addEventListener('open', () => {
  timestampLog('WebSocket connection 2 opened');
  timestampLog('WebSocket readyState:', ws2.readyState);
});
ws2.addEventListener('message', (event) => {
  if (event.data instanceof Blob) {
    event.data.arrayBuffer().then((buffer) => new Uint8Array(buffer)).then((data) => {
      timestampLog('Binary from server2:', data);
    });
  } else {
    timestampLog('Message from server2:', event.data);
  }
});
ws2.addEventListener('close', (event) => {
  timestampLog('WebSocket connection closed');
  timestampLog('Code:', event.code);
  timestampLog('Reason:', event.reason);
  timestampLog('Was clean:', event.wasClean);
  timestampLog('WebSocket readyState:', ws2.readyState);
});
  
setTimeout(() => {
  timestampLog('Sending message 1 to server');
  ws2.send("1|0|0|0|0|1|0|0|0|0");
  timestampLog('Message sent');
}, 1000);

setTimeout(() => {
  timestampLog('Sending message 2 to server');
  ws2.send("1|0|3|0|0|1|0|0|0|0");
  timestampLog('Message sent');
}, 1000);

setTimeout(() => {
  timestampLog(`Closing WebSocket connection. current readyState: ${ws2.readyState}`);
  ws2.close(1000, 'Client closed the connection');
}, 3000);