(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
  var Data = null;
  function updateLocation() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "https://bhoudou.github.io/post_get_scratch/positions.json",
      success: function(data) {
        Data = data;
      },
      error: function(jqxhr, textStatus, error) {
        console.log("Error downloading ISS data");
      }
    });
  }
 ext.set_gpio = function(moteur,valeur) {
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
ext.getInfo = function(stat) {
    if (!Data) return;
    if (stat === "longitude" || stat === "latitude")
      return issData[stat].toFixed(6).toString();
    else
      return issData[stat].toFixed(2).toString();
  };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'Moteur : %m.moteur valeur : %n','set_gpio','gauche','89'],
		[' ', 'gauche : %n droite : %n','set_gpio2','89','89'],
		['r', 'current ISS %m.loc', 'getInfo', 'longitude'],
        ],
	menus: {
        moteur: ['gauche', 'droite'],
	},
    };
    // Register the extension
    ScratchExtensions.register('GPIOESP8266', descriptor, ext);
	updateLocation();
	var poller = setInterval(updateLocation, 2000);
	
	
})({});

