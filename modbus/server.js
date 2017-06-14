// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var vector = {
    getInputRegister: function(addr, unitID) { return addr; },
    getHoldingRegister: function(addr, unitID) {
        // 生成800-1500的随机整数
        return addr + Math.random()*700 + 800; 
    },
    getCoil: function(addr, unitID) { return (addr % 2) === 0; },
    setRegister: function(addr, value, unitID) { console.log("set register", addr, value, unitID); return; },
    setCoil: function(addr, value, unitID) { console.log("set coil", addr, value, unitID); return; }
};

// set the server to answer for modbus requests
var isDev = process.env.NODE_ENV === 'development';
var defaultPort = isDev? 8502 : 8502;
var serverPort = process.env.PORT || defaultPort;
console.log("ModbusTCP listening on modbus://0.0.0.0:8502");
var serverTCP = new ModbusRTU.ServerTCP(vector, { host: "0.0.0.0", port: serverPort, debug: true, unitID: 1 });