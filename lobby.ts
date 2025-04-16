const timestampLog = (...msg: unknown[]) => {
  console.log(`${new Date().toLocaleString()}: ${msg}`);
}

const ws = new WebSocket('ws://localhost:8080/ws/counter/join');
ws.addEventListener('open', () => {
  timestampLog('WebSocket connection 1 opened');
  timestampLog('WebSocket readyState:', ws.readyState);
});
ws.addEventListener('message', (event) => {
  if (event.data instanceof Blob) {
    event.data.arrayBuffer().then((buffer) => new Uint8Array(buffer)).then((data) => {
      timestampLog('Binary from server1:');
      let offset = 0;
      const intValues: number[] = [];
      while(offset < data.length) {
        const int32 = new DataView(data.buffer).getInt32(offset, false);
        intValues.push(int32);
        offset += 4;
      }
      timestampLog('Parsed 4-byte integer:', intValues.toString());
    });
  } else {
    timestampLog('Message from server1:', event.data);
  }
});
ws.addEventListener('close', (event) => {
  timestampLog('WebSocket connection closed');
  timestampLog('Code:', event.code);
  timestampLog('Reason:', event.reason);
  timestampLog('Was clean:', event.wasClean);
  timestampLog('WebSocket readyState:', ws.readyState);
});

// setTimeout(() => {
//   timestampLog(`WebSocket1 readyState: ${ws.readyState}`);
//   timestampLog('Closing WebSocket connection');
//   ws.close(1000, 'Client closed the connection');
// }, 3000);