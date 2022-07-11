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
    // }else{
    //     alert("please enter an artist's name");
    // }
};

var getDates = function(artist) {
    // format URL to search by attraction/band - IN PROGRESS
    var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` + artist + `&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

    // make a get request to url
  fetch(apiUrl).then(function(response) {
    //  request was successful
    if (response.ok) {
       console.log(response);
      response.json().then(function(data) {
    //  pass response data to DOM
        console.log(data);

        displayDates(data,artist);//missed artist
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
    // if (dates.length === 0) { // CAN'T just use length
    if(numOfevents === 0){
        //  We can direct them to live videos here. Some other function.
        datesContainerEl.textContent = 'No tour dates found.';
        // return;
    }else{
        for(var i = 0; i < 2; i++){
            var tmEvents = dates._embedded.events[i];
            console.log(tmEvents);
            console.log(tmEvents.name);
            console.log(tmEvents.dates.start.localDate);
            console.log(tmEvents.dates.start.localTime);//missed ;
            //new
            console.log(tmEvents.url);
        }
        // loop through tour dates
     
        for (var i = 0; i < numOfevents; i++) {
            var tmEvents = dates._embedded.events[i];
            // format date name

            //where does events[i] come from
            // var date = events[i].venues.name + " - " + dates.start.localDate + " - " + dates.start.localTime;
            var date = tmEvents.name + " - " + tmEvents.dates.start.localDate +
             " - " + tmEvents.dates.start.localTime;

            console.log(date);

            //create a link element to take users to a link to buy tickets for chosen date
            var linkEl = document.createElement("a");
            var newLine = document.createElement("br");
            //new
            console.log(tmEvents.url);
            var ticketLink = document.createTextNode("Ticket Link" + date);
            linkEl.appendChild(ticketLink);
            linkEl.title = "Ticket Link";
            linkEl.href = tmEvents.url;
            //set for opening a new tab for the link
            linkEl.target = "_blank";
            linkEl.rel = "noopener noreferrer";
            datesContainerEl.appendChild(linkEl);
            datesContainerEl.appendChild(newLine);

            // dateEl.classList = "list-item flex-row justify-space-between align-center";

            // dateEl.setAttribute//link to ticketmaster tickets here

            // // dateEl.setAttribute("href", dates[i].html_url);
            // // dateEl.setAttribute("target", "_blank");

            // //create span to hold date element
            // var titleEl = document.createElement("span");
            // titleEl.textContent = date;
            // var newLine = document.createElement("br");
            // // append to container
            // // dateEl.appendChild(titleEl);

            // //new (To add new elements to the main element in html)
            // datesContainerEl.appendChild(titleEl);
            // datesContainerEl.appendChild(newLine);

            // // create a type "status" element
            // var typeEl = document.createElement("span");
            // dateEl.classList = "flex-row align-center";

            // // check other details here if required

            // // append to container
            // dateEl.appendChild(typeEl);
        }
    }
};

artistFormEl.addEventListener("submit", formSubmit);