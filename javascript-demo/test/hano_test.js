var hano = function(disc, src, sux, dist) {
  if (disc > 0) {
    hano(disc - 1, src, dist, sux);
    console.log('move ' + disc + ' from ' + src + ' to ' + dist)
    hano(disc - 1, sux, src, dist);
  }
};

console.log('---------------');
hano(1, 'src', 'sux', 'dist');
console.log('---------------');
hano(2, 'src', 'sux', 'dist');
console.log('---------------');
hano(3, 'src', 'sux', 'dist');
console.log('---------------');
hano(4, 'src', 'sux', 'dist');
console.log('---------------');
hano(5, 'src', 'sux', 'dist');
console.log('---------------');
hano(6, 'src', 'sux', 'dist');