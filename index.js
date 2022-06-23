const { Observable, concat, from } = require("rxjs");
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

const run = (commandList, portConfig, hostConfig) => {
  const port = portConfig || 8889;
  const host = hostConfig || "192.168.8.237";

  server.on("error", (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind({
    port: port,
  });

  const commands = commandList.map(
    (newMessage) =>
      new Observable((subscriber) => {
        server.on("message", (msg, rinfo) => {
          const bufferConverted = Buffer.from(msg).toString();
          console.log(
            `server got: ${bufferConverted} from ${rinfo.address}:${rinfo.port}`
          );
          if (bufferConverted === "ok") {
            subscriber.next(bufferConverted);
            subscriber.complete();
          }
        });
        console.log("send msg", newMessage);
        server.send(newMessage, port, host);
      })
  );

  concat(...commands).subscribe({
    next(x) {
      console.log("got value " + x);
    },
    error(err) {
      console.error("Error: " + err);
    },
    complete() {
      console.log("done");
    },
  });
};

module.exports = run;
