import SerialPort from 'serialport';
import Entry from './models/Entry';
const portName = process.argv[2] || 'tty0'; // FIXME!!!

const start = () => {
    const port = new SerialPort(portName, {
        boundRate: 9600
    });
    
    port.on('data', data => {
        console.log('yooooooooo :::', data);
    
        // const inside = data.split(',')[0]
        // const outside = data.split(',')[1]
        // Entry.create({inside, outside}, done);
    });
};

export { start };