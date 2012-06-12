//This is the js module loaded within the index.html page.
//RequireJS is a 'Javascript file and module loader'. It is used to load the 
//libraries required for the site e.g. backbone, underscore, jquery etc as well as the 
//the specific modules for the site, e.g. views, routers and models

//main.js is used to load the required libraries and the app.js module.

require.config( {
    paths: {
        'backbone':         'libs/AMDbackbone-0.5.3',
        'underscore':       'libs/underscore-1.2.2',
        'text':             'libs/require/text',
        'jquery':           'libs/jquery-1.7.1',
        //'json2':            'libs/json2',
        'jquerymobile':     'libs/jquery.mobile-1.0',
        'mustache':			'libs/mustache',
        'jqueryMustache':	'libs/jquery.mustache'
    },
    baseUrl: 'app'
} );

require(
        ['require', 'backbone', 'jquery', 'underscore', 'mustache' ],
        function( require, Backbone, $, _, Mustache ) {
            require(
					//['require', 'mustache', 'jquerymobile', 'json2', 'app'],
					['require', 'mustache', 'jquerymobile',, 'app'],
                    function( require, jquerymobile, mustache ) {
                        
                         // Global overrides to disable hashchange listening
                         // (as opposed to using urlHistory.listeningEnabled)
                         // This makes it easier to focus on using Backbone's own
                         // routing:
                    
						$.mobile.loadingMessage = "loading";
						
                        $.mobile.hashListeningEnabled = false;
                        $.mobile.pushStateEnabled = false;
                    } );
        } );
