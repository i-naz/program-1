
$(document).ready(function(){   
    var countriesData;
    let marker;
    let countriesBorderData; //Array
    let polygons = []   //Array to hold the border shapes

    var map = L.map('mymap').setView([0, 0], 1);
      
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }).addTo(map);
      


    $.ajax({
        url:"php_libs/borders.php",
        type:"get",
        dataType: "JSON",
        success: function(data){
           
           countriesBorderData = data.features
            
        },
        error: function(){
            console.log('We have An Error');
        }
    });

    $.ajax({
        url:"php_libs/countries.php",
        type:"get",
        success: function (data){
            console.log(data.data);
           
            $.each(data.data, function(value) {
                countriesData = data.data;
                
                $("#select_country").append("<option data-country='"+countriesData[value].name+"' value='" + countriesData[value].alpha2Code + "'>"+countriesData[value].name + "</option>");
            });
          
            renderInformation(countriesData[0].name);
            
            updateMap();
            weatherUpdate(countriesData[0].name);
        },
        error: function(error){
            console.log(error);
            }
        });

        function updateMap(){
            //to check
            if (marker != null) {
                map.removeLayer(marker);
                }
                
                marker = L.marker([$("#Lat").text(), $("#Lon").text()]).addTo(map);
                map.panTo([$("#Lat").text(), $("#Lon").text()], {
                animate: true,
                duration: 1,
                });
        }

         function renderInformation(selectedCountry){
             console.log('Render Information Called');
             console.log(selectedCountry);
            for(var i =0; i<countriesData.length; i++){
                if(countriesData[i].name == selectedCountry){
                    $(".flag_container").html("<img src = '"+countriesData[i].flag+"'>" );
                    // console.log(countriesData[i]);
                    $("#capital").text(countriesData[i].capital);  
                    $("#capital-content").text(countriesData[i].capital)     
                    $("#dialing-code").html("  "+countriesData[i].callingCodes);
                    $("#population").html("  "+countriesData[i].population.toLocaleString('GB'));
                    $("#currencies").html("  "+countriesData[i].currencies[0].name+ " "+countriesData[i].currencies[0].symbol);
                    $("#nativeName").html("  "+countriesData[i].nativeName);
                    $("#region").html("  "+countriesData[i].region);
                    $("#Lat").html("  "+countriesData[i].latlng[0]);
                    $("#Lon").html("  "+countriesData[i].latlng[1]);
                }           
            }
        }

        function weatherUpdate(selectedCountry){
           
            let city = $('#capital-content').text();
           
            $.ajax({
                url:"php_libs/weather.php",
                type:"post",
                data: {city: city},
                success: function (data){
                    // console.log( data);
                    //  console.log(data.data.main.temp)
                // $('#city_name').text(data.name) 
                let t = (parseFloat(data.data.main.temp) - 273.15).toFixed(2);

                let t_diff = parseInt(data.data.timezone)/3600 //Converting into UTC
                // // console.log(t_diff);
                let t_utc = t_diff > 0 ? `UTC +${t_diff}` : `UTC ${t_diff}`; 
                // // console.log(t_utc);
                $('#city_temp').text(t + ' C') 
                $('#humidity').text(data.data.main.humidity) 
                $('#weather_forecast').text(data.data.weather[0].description ?? '');
                $('#time_zone').text(t_utc)
                }
                })

         
               
               
           
        }

        //1: Sent AJAX Request to borders, grabbed JSON (Borders) Data
        //2: Created function to draw borders
        var countryGeometry;    //Storing teh Geometry of the selected country
        function drawBorders(selectedCountry){
           
            // console.log('This is CountriesBorderData:');
            
            for(let i = 0 ; i < countriesBorderData.length; i++){
                if(selectedCountry == countriesBorderData[i].properties.name){
                    countryGeometry = countriesBorderData[i].geometry
                    drawMap(countryGeometry)
                    break;
                }
            }

            if(countryGeometry == undefined){
                console.log('Your required country borders are not available');
            }
        }

        function drawMap(countryGeometry){
            //1: We check for the shape (Polygon/MultiPolygon)
            //2: If Polygon, we loop over the coordinates array and save them
           
           
//  coordinates = [[[1,23],[2,3]]]
            if(countryGeometry.type === 'Polygon'){
                let tempArr = []
                let correctCoordinates = [] //gonna hold co-ordinates
                for(let i = 0; i < countryGeometry.coordinates[0].length; i++){
                    let first = countryGeometry.coordinates[0][i][0]
                    let second = countryGeometry.coordinates[0][i][1]
                    
                    let tempArr = [second, first];
                    // console.log(tempArr);

                    correctCoordinates.push(tempArr)
                    // console.log(correctCoordinates);
                }




                // console.log(countryGeometry.coordinates[0]);
                // correctCoordinates = countryGeometry.coordinates[0]
                console.log('correctCoordinates');
                console.log(correctCoordinates);
                //Draw a Polygon Shape
                polygons.push(L.polygon(correctCoordinates, {color: 'red'}).addTo(map))

            }
            else if(countryGeometry.type === 'MultiPolygon'){
                for(let i = 0; i < countryGeometry.coordinates.length; i++){
                    let correctCoordinates = [] //gonna hold co-ordinates
                    // console.log(countryGeometry.coordinates[i]);
                    for(let j = 0; j < countryGeometry.coordinates[i][0].length; j++){
                        let first = countryGeometry.coordinates[i][0][j][0]
                        let second = countryGeometry.coordinates[i][0][j][1]
                        let tempArr = [second, first]
                        correctCoordinates.push(tempArr)
                    }
                  
                    polygons.push(L.polygon(correctCoordinates, {color: 'red'}).addTo(map))
                }
               

            }
            else {
                console.log('No border found');
            }
        }

        function removeoldPolygons(){
            for(let i = 0; i < polygons.length; i++){
                map.removeLayer(polygons[i])    //remove polygon shapes/borders
            }
        }

        $("#select_country").change(function(){
            console.log('Country Changed!');
            console.log($(this).find(":selected").val());
            var selectedCountry = $(this).find(":selected").data('country');
            console.log(selectedCountry);
            $('#country-data-modal').modal('show')
            renderInformation(selectedCountry);
            // console.log('Select Changed');
            weatherUpdate(selectedCountry);
            if(polygons!=undefined){
                removeoldPolygons();
            }
            updateMap();    //Updating teh Map
            drawBorders(selectedCountry);
            
        });
        
    });



//     $("#select_country").change(function(){
//         var selectedCountry = $(this).find(":selected").val();
//         // updateMap();

//     });
// 
    

