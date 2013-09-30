var Map = require('../lib/map');
var should = require('should');

describe('map', function() {
  it('map queue', function(done) {
    var map = new Map();
    map.bounds();
    map.addLayer('addLayer0');
    map.addLayer('addLayer1');
    map.addLayer('addLayer2');
    map.removeLayer('removeLayer2');
    map.addLayer('addLayer3');
    map.addLayer('addLayer4');
    map.bounds();
    map.removeLayer('removeLayer1');
    map.removeLayer('removeLayer0');
    map.destory();
    map.ready(function(){
      map._cmds.should.have.lengthOf(12);
      map._cmds[0].should.equal('renderBaseMap');
      map._cmds[1].should.equal('bounds');
      var layers = map._cmds.slice(2,5).sort();
      layers.should.eql( ['addLayer0', 'addLayer1', 'addLayer2']);
      layers = map._cmds.slice(5,8).sort();
      layers.should.eql(['addLayer3', 'addLayer4', 'removeLayer2']);
      layers = map._cmds.slice(9,11).sort();
      layers.should.eql(['removeLayer0', 'removeLayer1']);
      map._cmds[11].should.equal('destory');
      
      done();
    });
  });
});
