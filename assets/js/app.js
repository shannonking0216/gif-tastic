function getGifs(celebrities) {
    var apiKey = "jOiEr6XvZhLT9FxHSmErRdC6PjHSolFb";
    var searchTerm = celebrities;
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=20&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                //   below is where you left off getting to the point where you have your still and your animated... see activity Ajax, pausing gifs solution 
                // console.log(response.data[i]);
                // console.log(response.data[i].images.original.url);
                var p = $("<p>");
                p.text("Rated: " + response.data[i].rating);
                var img = $("<img data-state='still'>");

                img.attr("src", response.data[i].images.original.url);
                img.attr("data-moving-image", response.data[i].images.original.url);
                img.attr("data-still-image", response.data[i].images.original_still.url);

                $("#gif-holder").append(p, img);
            }
        });
}

getGifs("");

function makeButtons() {
    var celebrities = ["Kate McKinnon", "Jim Carrey", "Kenan Thompson", "Rashida Jones", "Maya Rudolph", "Bill Murray",
        "Leslie Jones", "Amy Poehler", "Will Ferrell", "Cecily Strong", "Tiny Fey", "Julia Louis Dreyfus", "Billy Crystal"];
    for (var i = 0; i < celebrities.length; i++) {
        var btn = $("<button>");
        btn.text(celebrities[i]);
        btn.attr("data-title", celebrities[i]);
        btn.addClass("btn btn-success show-btn");
        $("#buttons").append(btn);
    }
}
makeButtons();

$(document).on("click", ".show-btn", function (event) {
    console.log("clicked on a button");
    $("#gif-holder").empty();
    var celebrities = $(this).attr("data-title");
    console.log(celebrities);
    getGifs(celebrities);
});

$("#gif-holder").on("click", "img", function () {
    var imageState = $(this).attr("data-state");
    console.log(imageState);
    // var imageState = data-StaticRange.attr()
});
