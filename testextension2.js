(function(ext) {
  var issData = null;

  function updateISSLocation() {
    $.ajax({
      type: "GET",
      dataType: "json",
      //url: "http://api.open-notify.org/iss-now.json",
      url: "https://bhoudou.github.io/post_get_scratch/positions.json",
      success: function(data) {
        issData = data;
      },
      error: function(jqxhr, textStatus, error) {
        console.log("Error downloading ISS data");
      }
    });
  }

  ext.getISSInfo = function(stat) {
    if (!issData) return;
    if (stat === "longitude" || stat === "latitude")
      return issData[stat].toFixed(6).toString();
    else
      return issData[stat].toFixed(2).toString();
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
      ['r', 'current ISS %m.loc', 'getISSInfo', 'x']
    ],
    menus: {
      loc: ['x', 'y', 'angle']
    },
    url: 'http://khanning.github.io/scratch-isstracker-extension'
  };

  ScratchExtensions.register('ISS Tracker', descriptor, ext);

  updateISSLocation();
  var poller = setInterval(updateISSLocation, 2000);

})({});

