
$(document).ready(function(){   
    var countriesData;
    let marker;
    let countriesBorderData; //Array


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
            console.log('Countries Data Fetched');
            
            $.each(data.data, function(value) {
                countriesData = data.data;
                $("#select_country").append("<option>"+countriesData[value].name + "</option>");
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
                    console.log('Inside IF');
                    $(".flag_container").html("<img src = '"+countriesData[i].flag+"'>" );
                    console.log(countriesData[i]);
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
                    console.log( data);
                     console.log(data.data.main.temp)
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
            console.log('Draw Borders');
            console.log(selectedCountry);
            for(let i = 0 ; i < countriesBorderData.length; i++){
                if(selectedCountry == countriesBorderData[i].properties.name){
                    countryGeometry = countriesBorderData[i].geometry
                    drawMap(countryGeometry)
                    break;
                }
            }

            if(countryGeometry == undefined){
                console.log('YOur required country borders are not available');
            }
        }

        function drawMap(countryGeometry){
            //1: We check for the shape (Polygon/MultiPolygon)
            //2: If Polygon, we loop over the coordinates array and save them
            console.log('Inside drawMap()');
            // console.log(countryGeometry);
 coordinates = [[[1,23],[2,3]]]
            if(countryGeometry.type === 'Polygon'){
                let correctCoordinates = [] //gonna hold co-ordinates
                console.log(countryGeometry.coordinates[0]);
                correctCoordinates = countryGeometry.coordinates[0]
                //leaflet code
                L.polygon(correctCoordinates, {color: 'red'}).addTo(map)

            }

            if(countryGeometry.type === 'MultiPolygon'){
                console.log('It is Multi-polygon');
            }
        }

        $("#select_country").change(function(){
            var selectedCountry = $(this).find(":selected").val();
            console.log(selectedCountry)
            // updateMap();    //Updating teh Map
            //Opening teh Modal
            $('#country-data-modal').modal('show')
            renderInformation(selectedCountry);
            // console.log('Select Changed');
            weatherUpdate(selectedCountry);
            drawBorders(selectedCountry);
            
        });
        
    });



//     $("#select_country").change(function(){
//         var selectedCountry = $(this).find(":selected").val();
//         // updateMap();

//     });
// 
    

