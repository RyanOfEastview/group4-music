var videoList = document.querySelector('ul');

var tmapiKey = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;
var youtubeapiKey = "AIzaSyCS40HO3AJdGxpPdpbodyaFSBT4iwCibOw";

//Search Form variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#artist");

var formSubmit = function(event) {
    event.preventDefault();
    // console.log(event);

    //get value from input element
    var artist = nameInputEl.value.trim();
    if (artist) {
        // getDates(artist);
        console.log(artist);
        getVideo(artist);
        nameInputEl.value = "";
    }else{
        alert("please enter an artist's name");
    }
};

var getVideo = function (artist){//artistName
    var apiUrl = ' https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + artist
        + '&chart=mostPopular&type=video&maxResults=5&key='+youtubeapiKey;

    console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            
            for (var i = 0; i < 2; i++){
                //Taking the videoId
                var ytvVideoId = data.items[i].id.videoId;
                console.log(ytvVideoId);
                displayVideo(ytvVideoId);
            }

        });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Youtube');
      });
  };

  var displayVideo = function(videoId){

    var ytUrl = "https://www.youtube.com/embed/" + videoId;
    console.log(ytUrl);

    // Create a list element
    var listItem = document.createElement('iframe');

    // Set the text of the list element to the JSON response's edited videoId property
    listItem.src = ytUrl;

    // Append the li element to the id associated with the ul element.
    videoList.appendChild(listItem);

  }

// var getDates = function(attraction) {
//     // format URL to search by attraction/band - IN PROGRESS
//     var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=&apikey="+tmapiKey;

//     // make a request to the URL
//     fetch(apiUrl).then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });
// };

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
