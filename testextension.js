(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

 ext.set_gpio2 = function(moteur,valeur) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://192.168.1.43/gpio?gauche='+moteur+'&droite='+valeur+'&token=123abCde',
              type : 'POST',
	        });
    };
 ext.set_gpio2 = function(gauche,droite) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://192.168.1.43/gpio?gauche='+gauche+'&droite='+droite+'&token=123abCde',
              type : 'POST',
	        });
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'Moteur : %s.moteur valeur : %n','set_gpio','89'],
            [' ', 'gauche : %s droite : %n','set_gpio2','89','89'],
        ],
	menus: {
        moteur: ['gauche', 'droite'],
	},
    };
    // Register the extension
    ScratchExtensions.register('GPIOESP8266', descriptor, ext);
})({});

