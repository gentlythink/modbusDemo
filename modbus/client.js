var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
// open connection to a tcp line
client.connectTCP("120.76.133.127", { port: 8502 });
client.setID(1);


var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var io = require('socket.io');
var http = require('http');
const port = process.env.PORT || 8081;
var app = express();
app.use(cors());
app.use(bodyParser.json());
var server = http.createServer(app);
//Socket connection
io(server).on('connection', function(socket){
  console.log('user connected', socket.id);
  emitData(1000, socket);
  socket.on('disconnect', function(){
    console.log('user disconnected', socket.id);
    delete socket;
  });
});

server.listen(port, () => {
  console.log(`Server started listening on port: ${port}`)
});


function emitData(timeout = 1000, socket){
  setTimeout(() => {
    
    client.readHoldingRegisters(0, 4, function(err, data) {
        console.log(data.data);

        var timeStamp = new Date().getTime();
        let result = {
            timeStamp: timeStamp,
            data: [
                {
                name: "0",
                value: data.data[0]
                },
                {
                name: "1",
                value: data.data[1]
                },
                {
                name: "2",
                value: data.data[2]
                },
                {
                name: "3",
                value: data.data[3]
                }
            ]
        };
        socket.emit('chartData', result, function(ackTimeStamp){
            emitData(3000, socket);
        });
    });
    
  }, timeout);
}
