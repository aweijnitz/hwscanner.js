var fs = require('fs');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;


var conf = require('./conf/conf.js');
var serialListener = require('./lib/serialInterface.js').serialListener;

var saveFile = process.argv[2] || 'scan.raw';
var serialPort = new SerialPort(conf.serialPortName, conf.connectOpts);

// Make serial handler that collects all image scan lines and then
// saves the binary data
var handler = (function (imageSize, fileName) {
    var buf = new Buffer(imageSize);
    var receivedBytesCount = 0;
    return function (data) {
        if(receivedBytesCount >= imageSize) {
            //            console.log(buf.toString('hex'));
            fs.writeFileSync(fileName, buf, {
                encoding: null,
                flag: 'w'
            });
            buf = new Buffer(imageSize);
            receivedBytesCount = 0;
            serialPort.close(function() {
                process.exit();
            });

        } else {
            data.copy(buf, receivedBytesCount);
            receivedBytesCount += data.length;
        }
    };
})(conf.imageSize, saveFile);

// Setup serial listener
serialListener(serialPort, conf.connectOpts, handler);

// Trigger scan
