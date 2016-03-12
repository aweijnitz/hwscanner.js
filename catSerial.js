var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var conf = require('./conf/conf.js');
var serialListener = require('./lib/serialInterface.js').serialListener;
var serialPort = new SerialPort(conf.serialPortName, conf.connectOpts);

// Make serial handler that collects all image scan lines and then
// prints the data
var handler = (function (imageSize) {
    var buf = new Buffer(imageSize);
    var receivedBytesCount = 0;
    return function (data) {
        if(receivedBytesCount >= imageSize) {
            console.log(buf.toString('hex'));
            buf = new Buffer(imageSize);
            receivedBytesCount = 0;
        } else {
            data.copy(buf, receivedBytesCount);
            receivedBytesCount += data.length;
        }
    };
})(conf.imageSize);

serialListener(serialPort, conf.connectOpts, handler);
