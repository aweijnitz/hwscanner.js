var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

/**
* Register new handler for serial data on a given port.
*/
module.exports.serialListener = function serialListener(serialPort, connectOpts, dataHandler) {
    var receivedData = "";    
    serialPort.on("open", function () {
        console.log('opened serial communication');
        serialPort.on('data', function(data) {
            dataHandler(data);
        });
    });
};
