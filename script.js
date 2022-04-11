$(document).ready(function(){   
    var countriesData;
    let marker;
    $.ajax({
        url:"php_libs/countries.php",
        type:"get",
        success: function (data){
            
            $.each(data.data, function(value) {
                countriesData = data.data;
                $("#select_country").append("<option>"+  countriesData[value].name + "</option>");
            });
            console.log(countriesData[0]);
            renderInformation(countriesData[0].name);
            // updateMap();
            weatherUpdate(countriesData[0].name);
        },
        error: function(error){
            console.log('Request Unsuccessful!!');
            console.log(error);
            }
        });

         function renderInformation(selectedCountry){
             console.log('Render Information Called');
             console.log(selectedCountry);
            for(var i =0; i<countriesData.length; i++){
                if(countriesData[i].name == selectedCountry){
                    $(".flag_container").html("<img src = '"+countriesData[i].flag+"'>" );
                    console.log(countriesData[i].capital);
                    $("#capital").text(countriesData[i].capital);  
                    $("#capital-content").html('this is test')     
                    $("#dialing-code").html("  "+countriesData[i].callingCodes);
                    $("#population").html("  "+countriesData[i].population);
                    $("#currencies").html("  "+countriesData[i].currencies[0].name+ " "+countriesData[i].currencies[0].symbol);
                    $("#nativeName").html("  "+countriesData[i].nativeName);
                    $("#region").html("  "+countriesData[i].region);
                    $("#Lat").html("  "+countriesData[i].latlng[0]);
                    $("#Lon").html("  "+countriesData[i].latlng[1]);
                }           
            }
        }

        function weatherUpdate(selectedCountry){
            let city = $('#capital').text();
            $.ajax({
                url:"php_libs/weather.php",
                type:"get",
                success: function (data){
                    console.log(data);
                }
                })
               
                // console.log(data)
                // $('#city_name').text(data.name) 
                // let t = (parseFloat(data.main.temp) - 273.15).toFixed(2);

                // let t_diff = parseInt(data.timezone)/3600
                // // console.log(t_diff);
                // let t_utc = t_diff > 0 ? `UTC +${t_diff}` : `UTC ${t_diff}`; 
                // // console.log(t_utc);
                // $('#city_temp').text(t + ' C') 
                // $('#humidity').text(data.main.humidity) 
                // $('#weather_forecast').text(data.weather[0].description ?? '');
                // $('#time_zone').text(t_utc)
           
        }

        $("#select_country").change(function(){
            var selectedCountry = $(this).find(":selected").val();
            console.log(selectedCountry)
            //Opening teh Modal
            $('#country-data-modal').modal('show')
            renderInformation(selectedCountry);
            // console.log('Select Changed');
            weatherUpdate(selectedCountry);

            
        });  


            // Initializing map
    // let map = L.map('map').setView([0, 0], 1);
    // // Adding tileLayer 
    // L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR', {
    //     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    // }).addTo(map);

    // function updateMap(){ 
    // if(marker != null){
    //     map.removeLayer(marker);
    // }
    // marker = L.marker([$('#Lat').text(), $('#Lon').text()]).addTo(map);
    // map.panTo([$('#Lat').text(), $('#Lon').text()], {animate: true, duration: 1});
    // }

    $("#select_country").change(function(){
        var selectedCountry = $(this).find(":selected").val();
        // updateMap();
    });
});
    

//const latLngs = L.GeoJSON.coordsToLatLngs(data[0].geojson.coordinates,2); 
//L.polyline(latLngs, {
  //  color: "green",
    //weight: 14,
    //opacity: 1
//}).addTo(map);  https://stackoverflow.com/questions/55308638/draw-country-border-on-leaflet-map-using-json-coordinates?msclkid=0d44644ea6ca11ec904b97725676b64f 

