var apiKey = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

//Search Form variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#artist");
//get value from input element
var artist = nameInputEl.value.trim();

if (artist) {
    getDates(artist);
    nameInputEl.value = "";
}else{
    alert("please enter an artist's name");
}


var formSubmit = function(event) {
    event.preventDefault();
    console.log(event);

};

var getDates = function(attraction) {
    // format URL to search by attraction/band - IN PROGRESS
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";

    // make a request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
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

userFormEl.addEventListener("submit", formSubmit);

// getDates();

// this call looks for music events in the Los Angeles area("dmaID=324")
