module.exports = {
    serialPortName: '/dev/cu.usbserial-A98F3P5H',
    connectOpts: {
        baudrate: 57600,
        // defaults for Arduino serial communication
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
    },
    imageSize: 16*10
};
