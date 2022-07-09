var datesContainerEl = document.querySelector("#dates-container");

var displayDates = function(dates) {
//check if api returned any tour dates
if (dates.length === 0) {
    //  We can direct them to live videos here. Some other function.
    datesContainerEl.textContent = 'No tour dates found.';
    return;
}

    // loop through tour dates
    for (var i = 0; i < dates.length; i++) {
        //create a link element to take users to a link to buy tickets for chosen date
        var dateEl = document.createElement("a");
        dateEl.classList = "";
        dateEl.setAttribute("href", dates[i].html_url);
        dateEl.setAttribute("target", "_blank");

        //create span to hold date title
        var titleEl = document.createElement("span");
        //  'title' may need to change depending on the variables returned in array
        titleEl.textContent = dates[i].title;

        // append to container
        dateEl.appendChild(titleEl)

        // create a type element
        var typeEl = document.createElement("span");

        // check other details here if required

        // append to container
        dateEl.appendChild(typeEl);

        datesContainerEl.appendChild(dateEl);
    }

};