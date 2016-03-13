var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var conf = require('./conf/conf.js');
var serialListener = require('./lib/serialInterface.js').serialListener;
var serialPort = new SerialPort(conf.serialPortName, conf.connectOpts);

// Make serial handler that collects all image scan lines and then
// prints the data
var handler = (function () {
    var receivedBytesCount = 0;
    return function (data) {
        
        for (var i = 0; i < data.length; i++) {
            console.log(data.readUInt8());
        }
    };
})();

serialListener(serialPort, conf.connectOpts, handler);
