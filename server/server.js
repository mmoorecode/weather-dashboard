const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});

const devicePath = "/dev/cu.usbmodem14101";
const baudRate = 9600;
const serverPort = 3000;

const logDataToConsole = false;
let currentHumidity = 0;
let currentTemp = 0;

// Specify the port that the arduino is on
// TODO: Add check if devicepath exists and only connect
// to port if it's there
const port = new SerialPort({
  path: devicePath,
  baudRate: baudRate,
});

// Create parser to read from the arduino port
const parser = port.pipe(
  new ReadlineParser({
    delimiter: "\r\n",
  })
);

// Handle socket io events upon connection to client
io.on("connection", (client) => {
  setInterval(() => {
    // Emit data to client once a second
    client.emit("current_temp", currentTemp);
    client.emit("current_humidity", currentHumidity);
  }, 1000);

  // Serve up temp and humidity data when prompted
  io.on("get_current_temp", (client) => {
    client.emit("current_temp", currentTemp);
  });
  io.on("get_current_humidity", (client) => {
    client.emit("current_humidity", currentHumidity);
  });
});

// Read data from the arduino port, update the humidity/temp variables
parser.on("data", function (data) {
  var humidityAndTemp = data.split("|");
  currentHumidity = humidityAndTemp[0];
  currentTemp = humidityAndTemp[1];

  if (logDataToConsole) {
    console.log(`Humidity ${currentHumidity}%`);
    console.log(`Temperature (C) ${currentTemp}`);
  }
});

// Listen on the server port
server.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});
