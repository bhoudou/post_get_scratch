(function(ext) {
  var IDData = null;
  function updateIDLocation() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "https://bhoudou.github.io/post_get_scratch/positions.json",
      success: function(data) {
        IDData = data;
      },
      error: function(jqxhr, textStatus, error) {
        console.log("Error downloading ID data");
      }
    });
  }

  ext.getIDInfo = function(stat) {
    if (!IDData) return;
    if (stat === "longitude" || stat === "latitude")
      return IDData[stat].toFixed(6).toString();
    else
      return IDData[stat].toFixed(2).toString();
  };

  ext._getStatus = function() {
    return { status:2, msg:'Ready' };
  };

  ext._shutdown = function() {
    if (poller) {
      clearInterval(poller);
      poller = null;
    }
  };

  var descriptor = {
    blocks: [
      ['r', 'current ID %m.loc', 'getIDInfo', 'x']
    ],
    menus: {
      loc: ['x', 'y', 'angle']
    },
  };

  ScratchExtensions.register('ID Tracker', descriptor, ext);

  updateIDLocation();
  var poller = setInterval(updateIDLocation, 2000);

})({});

