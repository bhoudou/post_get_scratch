(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_gpio = function(gpio,etat,callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://192.168.1.43/gpio?id='+gpio+'&etat='+etat+'&token=123abCde',
              dataType: 'text',
              success: function( data ) {
				 callback = data
              }
	return callback
        });
    };
 ext.set_gpio2 = function(gpio,etat,callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://192.168.1.43/gpio?id='+gpio+'&etat='+etat+'&token=123abCde',
              dataType: 'text',
              success: function( data ) {
				 callback = data 
              }
	return callback
        });
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'Gpio : %s etat : %n','set_gpio','D7','1'],
            ['r', 'Gpio : %s etat : %n','set_gpio2','D7','1'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('GPIOESP8266', descriptor, ext);
})({});
