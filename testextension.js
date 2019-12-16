(function(ext) {
  var IDData = null;
  function updateIDLocation() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: 'http://192.168.1.45/data.json',
      //url: "smb://192.168.1.45/partage_public/data.json",
      //url: "https://bhoudou.github.io/post_get_scratch/data.json",
      success: function(data) {
        IDData = data;
      },
    });
  }

  ext.getIDInfo = function(id,info) {
    if (!IDData) return;
	  {
		  var temp = IDData["data"];
		  for (var i=0; i < temp.length; i++) {
			var temp2 = temp[i];
			if(id==temp2["id"]) return temp2[info].toFixed(1).toString();
			}
	  }
  };

  ext._getStatus = function() {
    if (!IDData) return { status:1, msg:'no Data' };
	  return { status:2, msg:'Ready' };
  };

  ext._shutdown = function() {
    if (poller) {
      clearInterval(poller);
      poller = null;
    }
  };

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

// Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'Moteur : %m.moteur valeur : %n','set_gpio','gauche','89'],
		[' ', 'gauche : %n droite : %n','set_gpio2','89','89'],
		['r', 'ID: %n valeur: %m.loc', 'getIDInfo','12', 'x'],
        ],
	menus: {
       		moteur: ['gauche', 'droite'],
		loc: ['x', 'y', 'angle']
	},
    };
    // Register the extension
    ScratchExtensions.register('GPIOESP8266', descriptor, ext);
  updateIDLocation();
  var poller = setInterval(updateIDLocation, 2000);

})({});


