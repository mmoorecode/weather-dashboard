This is a full-stack app that includes reading from a serial port 
on an arduino to retrieve temperature and humidity data in real time.
Also utilizes ArcGIS and the esri loader to display geospatial data.

Setup:
1.  Gather materials listed in arduino/"Bill of Materials.txt"
2.  Wire up components according to arduino/wiring_diagram.png
3.  Ensure that the arduino IDE is installed
4.  Connect arduino to computer via usb
5.  Download the arduino/temperature_and_humidity.ino to the arduino.
6.  Start server using "cd server | node server.js" to begin reading humidity
    and temperature data from the arduino's serial port
5.  Start client using "cd frontend | npm start"

Troubleshooting notes:
Live data is reliant on WebSockets to transmit data from the server to the client
and numerous browsers do not support sockets.  Chrome is recommended for running this project.

The port for the arduino changes every time it's physically disconnected/reconnected.
Before starting server.js, ensure that the devicePath variable in the file matches
the serial port listed for the arduino in the IDE (Tools>Port>/dev/cu.usbmodem<somenumber>)

If running from a PC, use "npm run start-pc" to start the frontend