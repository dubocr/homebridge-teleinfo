# homebridge-teleinfo

Supports USB/Serial teleinfo devices on HomeBridge

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-teleinfo --unsafe-perm --build-from-source
3. Update your configuration file. See bellow for a sample.

Your homebridge installation must run as root/sudo

# Configuration

Configuration sample:

 ```
    {
        "bridge": {
            ...
        },
        
        "description": "...",

        "accessories": [
        	{
            	"accessory": "Teleinfo",
            	"name": "Meter",
	    				"port": "/dev/ttyAMA0"
        	}
        ],
    }
```

| Parameter                  | Note                                                                                                                                                                  |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`               		 	 | mandatory, accessory displayed name                                                                                                                     							 |
| `port`             	 			 | mandatory, the serial or USB port on which teleinfo device is plugged                                                                                                 |

# Compatible devices

You can find teleinfo devices here :
https://www.tindie.com/stores/Hallard/
http://www.cartelectronic.fr/teleinfo-compteur-erdf/104-teleinfo-1-compteur-usb-lc.html
