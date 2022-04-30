$(document).ready(function(){ 

  
var map = L.map('mymap', {
  center: [ -1.47216796875,
             53.38332836757156],
  zoom: 5
});

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

    // $.getScript('script.js', function(){
      var lat= $('#Lat').text();
        var lon = $('#Lon').text();
        console.log(lat);
        console.log(lon);
      $("#select_country").change(function(){
        map.remove()
        console.log('Select Changed');
        
        var lat= $('#Lat').text();
        var lon = $('#Lon').text();
        console.log(lat);
        console.log(lon);

          //Map Code
        map = L.map('mymap', {
          center: [ lat, lon],
          zoom: 4
        });
        
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR', {
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        }).addTo(map);

});
});
// });



  //  var map = L.map('#mymap', {
  //       center: [ -1.47216796875,
  //         53.38332836757156],
  //       zoom: 3
  //     });

  
//.setView([0, 0], 1)
    
  // L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
  //   maxZoom: 20,
  //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  //   }).addTo(map);
 


  

