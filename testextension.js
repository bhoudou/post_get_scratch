(function(ext) {
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
        console.log("Error downloading data");
      }
    });
  }
 ext.set_gpio = function(moteur,valeur) {
        $.ajax({
              url: 'http://192.168.1.43/gpio?gauche='+moteur+'&droite='+valeur+'&token=123abCde',
              type : 'POST',
	        });
    };
 ext.set_gpio2 = function(gauche,droite) {
        $.ajax({
              url: 'http://192.168.1.43/gpio?gauche='+gauche+'&droite='+droite+'&token=123abCde',
              type : 'POST',
	        });
    };
ext.getInfo = function(stat) {
    if (!Data) return;
    return Data[stat].toFixed(2).toString();
  };
ext._shutdown = function() {
    if (poller) {
      clearInterval(poller);
      poller = null;
    }
  };
// Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'Moteur : %m.moteur valeur : %n','set_gpio','gauche','89'],
		[' ', 'gauche : %n droite : %n','set_gpio2','89','89'],
		['r', 'ID: %n valeur: %m.loc', 'getInfo','0', 'x'],
        ],
	menus: {
       		moteur: ['gauche', 'droite'],
		loc: ['x', 'y', 'angle']
	},
    };
    // Register the extension
    ScratchExtensions.register('GPIOESP8266', descriptor, ext);
	updateLocation();
	var poller = setInterval(updateLocation, 2000);
	
	
})({});

