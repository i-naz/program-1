$(document).ready(function(){ 
    $.getScript('country_data.js', function(){
      var lat= $('#Lat').text;
      var lang = $('#Lon').text;
    $("#select_country").change(function(){
    


   var map = L.map('.mymap', {
        center: [lat, lang],
        zoom: 3
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      //var marker = L.marker([11.3499986, 142.1999992])
      //marker.addTo(map);
    });
});
});
