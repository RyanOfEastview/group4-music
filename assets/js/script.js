var tmApiKey = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

//Search Form variables
var artistFormEl = document.querySelector("#artist-form");
var nameInputEl = document.querySelector("#artist");
var searchContainerEl = document.querySelector("#search-container");
//get value from input element

var formSubmit = function(event) {
    event.preventDefault();
    // console.log(event);
    var artist = nameInputEl.value.trim();

    if (artist) {
        getDates(artist);

       // clear old content
        searchContainerEl.textContent = '';
        nameInputEl.value = '';
    }
    // }else{
    //     alert("please enter an artist's name");
    // }
};

var getDates = function(artist) {
    // format URL to search by attraction/band - IN PROGRESS
    var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` + artist + `&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

    // make a get request to url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        displayDates(data, artist);
      });
    } else {
      alert('Error: Artist Not Found');
    }
  })
  .catch(function(error) {
    alert('Unable to connect.');
  });
};

// var getDates = function(artist) {
//     // format URL to search by attraction/band - IN PROGRESS
//     // this call looks for music events in the Los Angeles area("dmaID=324")
//     var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";

//     // make a request to the URL
//     fetch(apiUrl).then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });
// };

artistFormEl.addEventListener("submit", formSubmit);

// getDates();

// this call looks for music events in the Los Angeles area("dmaID=324")
