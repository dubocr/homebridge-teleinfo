var teleinfo = require('./teleinfo');
var inherits = require('util').inherits;

var Accessory, Service, Characteristic, UUIDGen, Types;

module.exports = function(homebridge) {
    console.log("homebridge-teleinfo API version: " + homebridge.version);

    // Accessory must be created from PlatformAccessory Constructor
    Accessory = homebridge.platformAccessory;

    // Service and Characteristic are from hap-nodejs
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;
    Types = homebridge.hapLegacyTypes;

		makeCharacteristics();
		
    homebridge.registerAccessory('homebridge-teleinfo', 'Teleinfo', TeleinfoAccessory);
}

TeleinfoAccessory = function(log, config) {
	if (!config.port) {
		throw new Error('Invalid or missing `port` configuration.');
	}
	if (!config.name) {
		throw new Error('Invalid or missing `name` configuration.');
	}
  this.service = new Service.Outlet(config.name);
	this.service.addCharacteristic(EnergyConsumption);
	this.service.addCharacteristic(PowerConsumption);
		
  this.energy = this.service.getCharacteristic(EnergyConsumption);
  this.power = this.service.getCharacteristic(PowerConsumption);
    
  var that = this;
	var trameEvents = teleinfo(config.port);

	trameEvents.on('tramedecodee', function (data) {
		if(data.PAPP) {
			that.power.updateValue(data.PAPP);
		}
		if(data.BASE) {
			that.energy.updateValue(data.BASE/1000);
		}
	});

	trameEvents.on('error', function (err) {
		log(err);
	});
};

TeleinfoAccessory.prototype = {
	getServices() {
    return [this.service];
  }
}

function makeCharacteristics() {
	PowerConsumption = function() {
    Characteristic.call(this, 'Current Consumption', 'E863F10D-079E-48FF-8F27-9C2605A29F52');
    this.setProps({
      format: Characteristic.Formats.INT,
      maxValue: 65535,
      minValue: 0,
      minStep: 1,
      unit: "W",
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  inherits(PowerConsumption, Characteristic);
  
  EnergyConsumption = function() {
    Characteristic.call(this, 'Total Consumption', 'E863F10C-079E-48FF-8F27-9C2605A29F52');
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      maxValue: 4294967295,
      minValue: 0,
      minStep: 0.01,
      unit: "kWh",
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  inherits(EnergyConsumption, Characteristic);
}