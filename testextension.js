(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_gpio = function(gpio,etat) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://192.168.1.43/gpio?id='+gpio+'&etat='+etat+'&token=123abCde',
              dataType: 'text',
              success: function( data ) {
		       return data;
              }

        });
    };
 ext.set_gpio2 = function(gauche,droite) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://192.168.1.43/gauche?id='+gauche+'&droite='+droite+'&token=123abCde',
              type : 'POST',
	        });
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'Moteur : %s etat : %n','set_gpio','D7','1'],
            [' ', 'gauche : %s droite : %n','set_gpio2','89','89'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('GPIOESP8266', descriptor, ext);
})({});

