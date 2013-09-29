var Map = require('../lib/map');

describe('map', function() {
  it('map queue', function(done) {
    var map = new Map();
    map.addLayer('addLayer0');
    map.addLayer('addLayer1');
    map.addLayer('addLayer2');
    map.removeLayer('removeLayer2');
    map.addLayer('addLayer3');
    map.addLayer('addLayer4');
    map.removeLayer('removeLayer1');
    map.removeLayer('removeLayer0');
    map.destory();
    map.ready(done);
  });
});
