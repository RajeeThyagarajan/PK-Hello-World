/* Name: app.js
 * Version: 1.0
 * Author: Prokarma
 *
 * -------------------------------------------------------------
 * Copyright (c) 2012 Prokarma, Inc.
 * All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 * --------------------------------------------------------------
 */
//making sure the config is available before angular bootstrapping

angular.element(document).ready(function() {
	var initInjector = angular.injector(['ng']);
	var $http = initInjector.get('$http');
	$http.get('config/config.json').then(function(response) {
		angular.module('MainApp').constant('CONFIG', response.data);
		angular.bootstrap(document, ['MainApp']);

	});
});

// Define all your modules

angular.module('Recharge', []);

angular.module('SharedUtils', []);

// Lastly, define your "main" module and inject all other modules as dependencies
angular.module('MainApp', ['Recharge', 'SharedUtils', 'ngRoute']);

