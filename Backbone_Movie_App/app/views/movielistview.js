//This View is used to display the MovieList information from the model.

define( ['jquery', 'jquerymobile', 'underscore', 'backbone', 'mustache', 'jqueryMustache', 'models/models', 'text!templates/moviesview.html'],
        function( $, jquerymobile, _, Backbone, Mustache, jQueryMustache, MoviesModel, MovieTemplate ) {
            // Using ECMAScript 5 strict mode during development
            "use strict";

			var movieListView = Backbone.View.extend({
				el: $('#movielistview'),

				events: {
                    "click .movieClick": "clickLink"
                },
				
				initialize: function() {
					var self = this;
					
					this.template = $('#movie-list-item-template');

					this.model = new MoviesModel;
				},
				
				clickLink: function(e) {
					//Clear localStorage as new movie has been selected
					//localStorage.clear();
					
					//Need to get the id of the movie clicked
					var clickedEl = $(e.currentTarget);  
					var id = clickedEl.attr("id");
					
					localStorage.setItem('movieId', id);
					var url = '#movie',
								effect = 'slideup',
								reverse = false,
								changeHash = false;
					$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
				},
				
				fetch: function( movie, searchType ) {
					var movieListHTML = '';
			
					var self = this;
					
					// fetch from server		    
					this.model.fetchData( movie, searchType, function() {
						movieListHTML = self.renderResults();
					});	
			
				},
				
				renderResults: function() {
					var self = this;
					
					var movieList = self.model.get('results');
					
					var template = this.template,
						moviesListContainer = $('#search').find(":jqmData(role='content')"),
						listView = $(this.el);	
						

					movieList.forEach( function(movie) {							
						var mustacheView = {
							id:				movie.id,
							title:			movie.title,
							poster_path:	"http://cf2.imgobject.com/t/p/w92" + movie.poster_path,
							release_date:	movie.release_date.substring(0,4)
						};

						listView.append(template.mustache(mustacheView));					
					});

					
					listView.listview('refresh');
		
					//Set localstorage variable to allow back and forward scrolling. Will be called from Router
					//When a new search (handleKey event is invoked) the localstorage will be emptied
					localStorage.setItem("movieListModel", JSON.stringify(movieList));
				}//,
				
				////render localStorage model
				//renderPrevious: function(localModel){
				//	//Maybe put this into another method so both this and render above can use the same
					
				//	var movieList = JSON.parse(localModel);
					
				//	var template = this.template,
				//	moviesListContainer = $('#search').find(":jqmData(role='content')"),
				//	listView = $(this.el);	
					

				//	movieList.forEach( function(movie) {							
				//		var mustacheView = {
				//				id:				movie.id,
				//				title:			movie.title,
				//				poster_path:	"http://cf2.imgobject.com/t/p/w92" + movie.poster_path,
				//				release_date:	movie.release_date.substring(0,4)
				//		};

				//		//alert("mustacheView " + mustacheView);
				//		listView.append(template.mustache(mustacheView));
				//		//alert(JSON.stringify(movie));
				//	});

				
				//	listView.listview('refresh');
				//}
			});		
		
		return movieListView;
		
	});