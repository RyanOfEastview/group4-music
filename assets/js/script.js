var tmApiKey = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

//Search Form variables
var artistFormEl = document.querySelector("#artist-form");
var nameInputEl = document.querySelector("#artist");
var searchContainerEl = document.querySelector("#search-container");
var artistSearchTerm = document.querySelector("#artist-search-term");

//display variable
var datesContainerEl = document.querySelector("#dates-container");

//get value from input element
var formSubmit = function(event) {
  event.preventDefault();
  // console.log(event);
  var artist = nameInputEl.value.trim();

  if (artist) {
    getDates(artist);

    // clear old content
    searchContainerEl.textContent = "";
    nameInputEl.value = "";
  }
};

var getDates = function(artist) {
    // format URL to search by attraction/band 
    var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` + artist + `&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

    // make a get request to url
  fetch(apiUrl).then(function(response) {
    //  request was successful
    if (response.ok) {
       console.log(response);
      response.json().then(function(data) {
    //  pass response data to DOM
        console.log(data);

        displayDates(data,artist);
      });
    } else {
      alert('Error: Artist Not Found');
    }
  })
  .catch(function(error) {
    alert('Unable to connect.');
  });
};

var displayDates = function(dates, searchTerm) {
  artistSearchTerm.textContent = searchTerm;

  var numOfevents = dates.page.totalElements;

  //check if api returned any tour dates
   if(numOfevents === 0){
      //  We can direct them to live videos or second API here
      datesContainerEl.textContent = 'No tour dates found.';
      // return;
    }else{
    
    for(var i = 0; i < 2; i++){
      var tmEvents = dates._embedded.events[i];
      // console.log(tmEvents);
      // console.log(tmEvents.name);
      // console.log(tmEvents.dates.start.localDate);
      // console.log(tmEvents.dates.start.localTime)
    }

    // loop through tour dates
    for (var i = 0; i < numOfevents; i++) {
      var tmEvents = dates._embedded.events[i];
    
      // format date name that is displayed on screen
      var date = tmEvents.name + " - " + tmEvents.dates.start.localDate +
        " - " + tmEvents.dates.start.localTime + " - " + tmEvents._embedded.venues[0].name + " - " + tmEvents._embedded.venues[0].city.name + " - " + tmEvents._embedded.venues[0].country.countryCode;
      console.log(date);

      //create a link element to take users to a link to buy tickets for chosen date
      var linkEl = document.createElement("a");
      linkEl.classList = "list-item flex-row justify-space-between align-center";
      
      var newLine = document.createElement("br");
      console.log(tmEvents.url);
      
      var ticketLink = document.createTextNode("" + date);
      linkEl.appendChild(ticketLink);
      linkEl.title = "";
      linkEl.href = tmEvents.url;
      
      //set for opening a new tab for the link
      linkEl.target = "_blank";
      linkEl.rel = "noopener noreferrer";
      datesContainerEl.appendChild(linkEl);
      datesContainerEl.appendChild(newLine);

    }
  }
};

artistFormEl.addEventListener("submit", formSubmit);