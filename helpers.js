// definitely, definitely, don't modify this.
const geocodeAndGetWeather = function(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      $("#location").html(results[0].formatted_address);
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      $.ajax({
        type: 'GET',
        url: 'https://api.darksky.net/forecast/52dd0a0afe6b85172771658ff9fb4b3a/' + lat + ',' + lng + '?callback=?',
        dataType: 'jsonp',
        contentType: "application/json",
        success: handleWeatherResponse
      });
    }
  });
}

// given a Darksky icon name, returns a Font Awesome icon element
const icon = function(iconName) {
  switch(iconName) {
    case "clear-day":
    case "clear-night":
      return "<i class='fas fa-sun'></i>";
      break;
    case "rain":
      return "<i class='fas fa-tint'></i>";
      break;
    case "wind":
      return "<i class='fas fa-bars'></i>";
      break;
    case "snow":
    case "sleet":
    return "<i class='fas fa-snowflake'></i>";
      break;
    default:
      return "<i class='fas fa-cloud'></i>";
      break;
  }
}
