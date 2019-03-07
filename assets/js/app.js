function getGifs(snlComics) {
    var apiKey = "jOiEr6XvZhLT9FxHSmErRdC6PjHSolFb";
    var searchTerm = snlComics;
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var p = $("<p>");
                p.text("Rated: " + response.data[i].rating);
                var img = $("<img data-state='still' class='gif'>");
                img.attr("src", response.data[i].images.original.url);
                img.attr("data-animate", response.data[i].images.original.url);
                img.attr("data-still", response.data[i].images.original_still.url);
                $("#gif-holder").append(p, img);
            }
        });
}

function newButtons() {
    var btn = $("<button>");
    $("#search-bar").val("");
    getGifs("");
}

function makeButtons() {
    var snlComics = ["Kate McKinnon", "Jim Carrey", "Kenan Thompson", "Rashida Jones", "Maya Rudolph", "Bill Murray",
        "Leslie Jones", "Amy Poehler", "Will Ferrell", "Cecily Strong", "Tiny Fey", "Julia Louis Dreyfus", "Billy Crystal"];
    for (var i = 0; i < snlComics.length; i++) {
        var btn = $("<button>");
        $("#search-bar").val("");
        btn.text(snlComics[i]);
        btn.attr("data-title", snlComics[i]);
        btn.addClass("btn btn-success show-btn");
        $("#buttons").append(btn);
    }
}
makeButtons();

$(document).on("click", ".show-btn", function (event) {
    event.preventDefault();
    console.log("clicked on a button");
    $("#gif-holder").empty();
    var snlComics = $(this).attr("data-title");
    console.log(snlComics);
    getGifs(snlComics);
});

$("#gif-holder").on("click", function () {
    event.preventDefault();
    var imageState = $(this).attr("data-state");
    if (imageState === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
