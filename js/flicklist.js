

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {

  root: "https://api.themoviedb.org/3",
  token: "d338baacf69c32f85b06b2467106e49b", // TODO 0 add your api key

  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    // TODO 4b
    // implement this function

    return "http://image.tmdb.org/t/p/w300/" +  movie.poster_path;
  }
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<h6></h6>").text(movie.original_title);

    // TODO 1 
    // add an "I watched it" button and append it below the title
    // Clicking should remove this movie from the watchlist and re-render

    // TODO 2i
    // apply the classes "btn btn-danger" to the "I watched it button"

    // TODO 4a
    // add a poster image and append it inside the 
    // panel body above the button

    // TODO 2g
    // re-implement the li as a bootstrap panel with a heading and a body

	var btnIWatchedIt = $("<button class='btn btn-danger'></button>")
      .text("I watched it")
      .click(function() {
		var index = model.watchlistItems.indexOf(movie);
		if (index > -1) {
			model.watchlistItems.splice(index,1);
			render();
		}	
		}); 
	var imgMovie = $('<img class="img-responsive">');
	imgMovie.attr('src',api.posterUrl(movie));
	var itemTitle = $("<div class = 'panel-heading'></div>").append(title);
	var itemBtn = $("<div class = 'panel body'>").append(imgMovie).append(btnIWatchedIt);
    var itemView = $("<li></li>")
      .append(itemTitle)
      .append(itemBtn)
      .attr("class", "item-watchlist panel panel-default");

	
	
	  

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    // TODO 2d continued
    // style this list item to look like the demo
    // You'll also need to make changes in index.html.
    // use the following BS classes:
    // "list-group", "list-group-item", btn", "btn-primary", 

    var title = $("<h4></h4>").text(movie.original_title);

    var button = $('<button class = "btn btn-primary"></button>')
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $('<li class="list-group-item"></li>')
      .append(title)
      .append(overview)
      .append(button);
      
    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});