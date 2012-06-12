define( ['jquery', 'backbone', 'views/movielistview', 'views/movieview', 'views/moviesummaryview', 'models/movie'],
        function( $, Backbone, movieListView, movieDetailsView, movieSummaryView, MovieDetailsModel ) {
            // Using ECMAScript 5 strict mode during development.
            "use strict";

            var Routers = Backbone.Router.extend( {
                routes: {
					"search":                  			"search",     
					"movie":							"movie",
					"movieoverview":					"movieoverview",
                    "" : 								"root"                                     
                },
				
                //This route is called from the handleKey method within each of the views, or from the Back/Forward buttons.  If the MovieList Model details
                // are present in LocalStorage it will display these, however if a new search is required it will create the MovieList view which will call
                //the Movie List model
                search: function() {
                	var movieListModel = localStorage.getItem('movieListModel');
                	if (movieListModel == null){
                		var query = localStorage.getItem("searchTerm");
                    	var searchType = "search";
                    	this.movie_view = new movieListView();
                		
    					this.movie_view.fetch( query, searchType);
                	}
                	else {
                		var url = '#search',
							effect = 'slideup',
							reverse = false,
							changeHash = false;
                		$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
                	}	
                },
                
                //This route is called when a movie on the search results page is clicked.  It will check to see if MovieDetails model info is 
                //present already (cater for Forward/Back Buttons) and if so it will load the page from localStorage.
                //If details are not already present then it will call the moviedetails view which is responsible for getting the model details from the model
				movie: function () {
					
					var movieDetailsItem = localStorage.getItem('movieDetailsItem');
					if (movieDetailsItem == null){
						var searchType = "movie";
						var id = localStorage.getItem('movieId');	
						this.moviedetails_view = new movieDetailsView();
						this.moviedetails_view.fetch(id, searchType);
					}
					else {
						var url = '#movie',
						effect = 'slideup',
						reverse = false,
						changeHash = false;
						$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
					}
					
                },
				
                //This route handles the Movie Summary View which just renders the full Movie Overview details returned from the server call for Movie Details
				movieoverview: function ( ) {						
					this.moviesummary_view = new movieSummaryView();
					this.moviesummary_view.render();
                },
				
                //This route is called from the root page. It will clear the localStorage as the user will be starting a new search
                root: function() {
                	localStorage.clear();
                	var url = '#index',
						effect = 'slideup',
						reverse = false,
						changeHash = false;
	            	$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
                }
            } );

            return Routers;
        } );
