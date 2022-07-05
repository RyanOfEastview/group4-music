var apiKey = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;


var getDates = function(attraction) {
    // format URL to search by attraction/band
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";

    // make a request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getDates();