// jQuery Weather!

// Using your newfound knowledge of jQuery, create a weather
// application. It should:
// - Use a loop to create 6 days of forecast within the <div> element
//   with class name "forecast"
// - When clicking the "Get the weather!" button, the weather should
//   appear with a "fade" effect (try fading in the .current and .forecast
//   elements at different speeds for maximum fun!)
// - It doesn't need to fade in again when clicking "Get the weather!"
//   after the first time

// NOTES AND HINTS

// All of the work of grabbing data from the Dark Sky API is already done
// for you! Your task is to take that data, transform it into HTML, and
// insert it into the document. All of your work begins on line 47!

// Each day of the forecast should use HTML markup similar to:
// <div class="col">
//   <h3><i class="fas fa-sun"></i></h3>
//   <h4>89|55</h4>
//   <h5>Clear throughout the day.</h5>
// </div>

// The CSS styles are already written to fit the markup above. However,
// feel free to go nuts!

// The provided icon() function (in helpers.js) takes a Dark Sky icon name
// (e.g. "clear-day") and converts it into an icon, e.g.
// icon("clear-day") => <i class='fas fa-sun'></i>

// Math.round(75.88) => 75

// .empty() empties the HTML contents of a jQuery DOM object

// .append() appends a string (containing HTML) to a jQuery DOM object

let handleWeatherResponse = function(response) {
  // leave these two lines alone; they allow for the inspection of
  // the response object in the browser console (try typing "response"
  // in the Chrome JavaScript console!)
  console.log(response)
  window.response = response

  // **** your code starts here - don't modify anything else. you will be sad.

  //empty page on click
  $("#current-conditions-icon").empty();
  $("#current-conditions-text").empty();
  $(".forecast").empty();

  //current icon
  let currentIcon = response.currently.icon
  let currentConditionsIconHtml = icon(currentIcon)
  $("#current-conditions-icon").append(currentConditionsIconHtml);

  //current condition temperature & summary
  let currentSummary = response.currently.summary
  let currentTemperature = Math.round(response.currently.temperature)
  let currentConditionsTextHtml =
    '<p>' + currentTemperature + '&#8457;</p>'
    + '<p>' + currentSummary + '</p>'
  $("#current-conditions-text").append(currentConditionsTextHtml);


  //for forecast days
  var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  //forecast
  for (let i=0; i<5; i++) {
    let dailyForecast = response.daily.data[i];

    //getting the day of the daily forecast based on its array
    //unfortunately, it seems the daily.data.time[0] is not
    //necessarily 'Today'.
    let unixTime = dailyForecast.time;
    let date = new Date(unixTime*1000)
    //tried to refer to https://darksky.net/dev/docs#data-block to
    //understand what 'time' in its array is
    //but I still can't know for sure if the day according to the timestamp
    //is correct or not for a forecast

    //let day = 'Today'
    //if (i!==0) {
      let day = weekday[date.getDay()]
    //}

    let dailyForecastHtml =
      '<div class = "col">'
        + '<h4>' + day + '</h4>'
        + '<h4>' + icon(dailyForecast.icon) + '</h4>'
        + '<h4>' + Math.round(dailyForecast.temperatureMin) + '&deg | '
        + Math.round(dailyForecast.temperatureMax) + '&deg</h4>'
        + '<h6>' + dailyForecast.summary + '</h6>'
      + '</div>'

    $(".forecast").append(dailyForecastHtml);
  }

//first fade in
  $(".current").fadeIn();
  $(".forecast").fadeIn(2000);

  // *** your code ends here -- really.
};

// leave this alone; does the event handling and ajax
$(function() {
  $("#get-the-weather").on("click", function(event) {
    event.preventDefault();
    let locationName = $("#location-name").val();
    geocodeAndGetWeather(locationName);
  });
});
