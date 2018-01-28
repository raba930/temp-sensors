import SerialPort from 'serialport';
import Entry from './models/Entry';
const portName = process.argv[2] || '/dev/ttyUSB0'; // FIXME!!!

const start = () => {
    const port = new SerialPort(portName, {
        boundRate: 9600
    });
    
    port.on('data', data => {
        const inside = Number(data.toString().split(',')[0]);
        const outside = Number(data.toString().split(',')[1]);
        Entry.create({inside, outside});
    });
};

export { start };