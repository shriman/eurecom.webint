 <script type="text/javascript"
  src="http://maps.google.com/maps/api/js?sensor=false"></script>

<script>
  
  /**************************
  //Script for the google map
  **************************/
  
  var map = null;
  var geocoder = null;
  var googleMap = document.getElementById('google-map');

  function showPosition(position) {
    //Fonction to be passed to the browser's geolocation function
        var latLng = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        map.setCenter(latLng);
        map.setZoom(15);
      }

      function showMap() {
        //This creates the initial map, or update it
        if (!map) {
          map = new google.maps.Map(googleMap, {
            zoom: 3,
            center: new google.maps.LatLng(37.4419, -94.1419),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
        }
        if(!geocoder){
          geocoder = new google.maps.Geocoder();
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      }

      function updateMap(){
        var newLocation = document.getElementById("location-box").value;
        geocoder.geocode( { 'address': newLocation}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location, 8);
            var marker = new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location
            });
          } else {
            alert("Error: " + status);
          }
        });
      }
      
      //Clicking on the "Show the map" will trigger the showMap() function
      document.getElementById('init-map').addEventListener('click',showMap, true);
      //Clicking on the update button will...update (the map)
      document.getElementById('update-map').addEventListener('click',updateMap, true);
      
      
      document.getElementById('geolocation-form').addEventListener('submit',function(){return false;},true);

</script>
