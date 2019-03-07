const path = require('path');

var Msal = require('msal');
var angular = require('angular');
// var _ = require('lodash');
// require('jquery');
// require('jquery-ui');
// require('jquery-ui/ui/widgets/sortable');
// require('./static/angular-ui-tree.js');
// require('./static/angular-ui-tree.min.css');

// require('./static/angular-growl.js');
// require('./static/angular-growl.min.css');

// require('./static/wysiwyg.js');
// //require('jquery-ui/ui/widgets/draggable');
// //require('jquery-ui/ui/widgets/droppable');

// //require('textangular/dist/textAngular-sanitize.js');
// //require('textangular/dist/textAngular.js');

// require('./css/main.less');

// var b2c = {
//     clientID: '36a43f27-7ee4-4ce6-8027-0385c3180ccd',
//     //authority: "https://login.microsoftonline.com/tfp/cerrulliassociatesb2cdev.onmicrosoft.com/B2C_1_SignUpOrIn/",
//     authority: 'https://login.microsoftonline.com/common',
//     b2cScopes: ["https://cerrulliassociatesb2cdev.onmicrosoft.com/lodestar/api"],
//     webApi: 'https://cerrulliassociatesb2cdev.onmicrosoft.com/lodestar'
// };

// var protectedResourceMap = new Map();
// protectedResourceMap.set("http://localhost:8080/LodestarApp/user", b2c.b2cScopes);
// protectedResourceMap.set("http://localhost:8080/LodestarApp/admin", b2c.b2cScopes);

var msalLogger = function (LoggingService) {
    return new Msal.Logger(
        function (logLevel, message, piiEnabled) {
            //LoggingService.info(message);
        }, {
            level: Msal.LogLevel.Verbose,
            correlationId: '12345'
        }
    );
};

var msalTokenReceivedCallback = function (LoggingService) {
    return function (errorDesc, token, error, tokenType) {
        if (token) {
            //LoggingService.info("msalTokenReceivedCallback: token received: in callback " + token)
        } else if (error) {
            //LoggingService.error("msalTokenReceivedCallback: error received: in callback " + error)
        }
    };
};

function htmlMode($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('');
    //$locationProvider.html5Mode(true).hashPrefix('#');
}

require('@azure/msal-angularjs');
//require('@uirouter/angularjs');
require('ngStorage');
require('@uirouter/angularjs');
require('angular-sanitize');
// require('angular-ui-bootstrap');

// require('angular-file-upload');

var modules = [
    'ui.router',
    'MsalAngular',
    'ngStorage',
    'ngSanitize',
    // 'ui.bootstrap',
    // 'dtw.icons',
    // 'dtw.folders',
    // 'ls.folderSelect',
    // 'ls.tableauPreview',
    // 'ui.tree',
    // 'angularFileUpload',
    // 'ui.bootstrap',
    // //'ngWYSIWYG',
    // 'angular-growl',
    // //'angular-sanitize',
    // //'textAngular'
];

angular.module('app', modules)
    .constant('AppIcons', {
        folderOpen: 'fa fa-folder-open',
        folderClose: 'fa fa-folder',

        subscription: 'fa fa-newspaper-o',
        moduleOpen: 'fa fa-folder-open',
        moduleClose: 'fa fa-folder',
        moduleRecent: 'fa fa-clock-o',

        project: 'fa fa-question',
        workbook: 'fa fa-book',
        chart: 'fa fa-bar-chart',
        document: 'fa fa-file-pdf-o',

        superIcon: 'fa fa-wrench',
        data: 'fa fa-database',

        flag: 'fa fa-flag-o',
        flagChecked: 'fa fa-flag',

        statusUnknown: 'fa fa-exclamation-triangle',
        statusGood: 'fa fa-check-circle-o',
        statusBad: 'fa fa-times-circle-o',

        cancel: 'fa fa-times',
        save: 'fa fa-save',
        add: 'fa fa-plus',
        questionMark: 'fa fa-question',
        checkMark: 'fa fa-check',
        options: 'fa fa-bars',
        lineChart: 'fa fa-line-chart',
        upload: 'fa fa-upload',
        favorite: 'fa fa-star',

        comment: 'fa fa-comment-o',
        tags: 'fa fa-tags',

        arrowDown: 'fa fa-caret-down',
        arrowUp: 'fa fa-caret-up',
        arrowLeft: 'fa fa-caret-left',
        arrowRight: 'fa fa-caret-right',

        toggleDown: 'fa fa-arrow-circle-down',
        toggleUp: 'fa fa-arrow-circle-up',
        toggleLeft: 'fa fa-arrow-circle-left',
        toggleRight: 'fa fa-arrow-circle-right',

        vDown: 'fa fa-angle-down',
        vUp: 'fa fa-angle-up',
        vLeft: 'fa fa-angle-left',
        vRight: 'fa fa-angle-right',

        vDownThick: 'fa fa-chevron-down',
        vUpThick: 'fa fa-chevron-up',
        vLeftThick: 'fa fa-chevron-left',
        vRightThick: 'fa fa-chevron-right',

        vDownThickCircle: 'fa fa-chevron-circle-down',
        vUpThickCircle: 'fa fa-chevron-circle-up',
        vLeftThickCircle: 'fa fa-chevron-circle-left',
        vRightThickCircle: 'fa fa-chevron-circle-right',

        selectChecked: 'fa fa-check-square'

    });

if (window !== window.parent && !window.opener) {
    angular.module('app')
        .config(['AppConfig', 'LoggingServiceProvider', 'msalAuthenticationServiceProvider', '$locationProvider', '$httpProvider',
            function (AppConfig, LoggingService, msal, $locationProvider, $httpProvider) {
                //LoggingService.debug('app.config.opener: ' + AppConfig.b2c.redirectPath);

                // see function @ line 37
                htmlMode($locationProvider);
                try {
                    msal.init({
                        clientID: AppConfig.b2c.clientID,
                        authority: AppConfig.b2c.authority,
                        tokenReceivedCallback: msalTokenReceivedCallback(LoggingService),
                        optionalParams: {
                            cacheLocation: 'localStorage',
                            logger: msalLogger(LoggingService),
                            storeAuthStateInCookie: true,
                            isAngular: true // probably not necessary
                        },
                        routeProtectionConfig: {
                            popUp: true
                        }
                    }, $httpProvider);
                } catch (error) {
                    LoggingService.error('msal.init:error');
                    LoggingService.error(error);
                }
            }
        ]);
} else {
    angular.module('app')
        .config(['AppConfig', 'LoggingServiceProvider', 'msalAuthenticationServiceProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', '$stateProvider',
            function (AppConfig, LoggingService, msal, $locationProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
                //LoggingService.debug('app.config: ' + AppConfig.b2c.redirectPath);

                // see function @ line 37
                htmlMode($locationProvider);

                function doStates() {
                    $stateProvider
                        // .state('/', {
                        //     url: '/',
                        //     template: require('./templates/home/version.html'),
                        //     controller: 'HomeController'
                        // })
                        .state('home', {
                            url: '/',
                            template: require('./templates/home/version.html'),
                            controller: 'HomeController'
                        });
                    // .state('home.parent', {
                    //     url: '^/subscription',
                    //     template: require('./templates/subscription.html'),
                    //     controller: 'SubscriptionController',
                    //     abstract: true
                    // })
                    // .state('home.redirect', {
                    //     url: '^/redirect/:id',
                    //     controller: 'RedirectController'
                    // })
                    // .state('home.parent.lodestar', {
                    //     url: '/:parent',
                    //     data: {
                    //         section: 'Lodestar Subscription'
                    //     },
                    //     views: {
                    //         'subscription': {
                    //             template: require('./templates/subscription_nav.html'),
                    //             controller: 'LodestarController'
                    //         },
                    //         'item': {
                    //             template: '<div data-ui-view></div>'
                    //         }
                    //     }
                    // })
                    // .state('home.parent.lodestar.view', {
                    //     url: '/view/:id',
                    //     controller: 'ViewController'
                    // })
                    // .state('home.parent.lodestar.doc', {
                    //     url: '/doc/:id',
                    //     controller: 'DocController'
                    // })
                    // .state('home.parent.lodestar.settings', {
                    //     url: '/settings',
                    //     views: {
                    //         'settings': {
                    //             template: require('./templates/settings.html'),
                    //             controller: 'SettingsController'
                    //         }
                    //     }
                    // });

                    // $stateProvider
                    //     .state('home.parent.reports', {
                    //         url: '^/data-supplements/:list',
                    //         views: {
                    //             'subscription': {
                    //                 template: require('./templates/subscription_nav.html'),
                    //                 controller: 'OtherController'
                    //             },
                    //             'item': {
                    //                 template: '<div data-ui-view></div>'
                    //             }
                    //         }
                    //     })
                    //     .state('home.parent.reports.view', {
                    //         url: '/:parent/view/:id',
                    //         template: '<div data-ui-view></div>',
                    //         controller: 'ViewController'
                    //     })
                    //     .state('home.parent.reports.doc', {
                    //         url: '/:parent/doc/:id',
                    //         template: '<div data-ui-view></div>',
                    //         controller: 'DocController'
                    //     })
                    //     .state('home.parent.reports.settings', {
                    //         url: '/settings',
                    //         views: {
                    //             'settings': {
                    //                 template: require('./templates/settings.html'),
                    //                 controller: 'SettingsController'
                    //             }
                    //         }
                    //     });

                    // $stateProvider
                    //     .state('home.admin', {
                    //         url: '^/admin',
                    //         data: {
                    //             section: 'Administrator'
                    //         },
                    //         template: require('./templates/admin/main.html'),
                    //         controller: 'AdminController',
                    //         requireLogin: true
                    //     });

                    $urlRouterProvider.otherwise(
                        function ($injector) {
                            var $state = $injector.get('$state');
                            $state.transitionTo('home');
                        }
                    );
                }

                try {
                    msal.init({
                        clientID: AppConfig.b2c.clientID,
                        authority: AppConfig.b2c.authority,
                        tokenReceivedCallback: msalTokenReceivedCallback(LoggingService),
                        optionalParams: {
                            cacheLocation: 'localStorage',
                            logger: msalLogger(LoggingService),
                            validateAuthority: true,
                            redirectUri: AppConfig.b2c.redirectPath,
                            postLogoutRedirectUri: AppConfig.b2c.redirectPath,
                            navigateToLoginRequestUrl: false,
                            //protectedResourceMap: protectedResourceMap,
                            //unprotectedResources: [],
                            storeAuthStateInCookie: true,
                            isAngular: true // probably not necessary
                        },
                        routeProtectionConfig: {
                            popUp: false,
                            requireLogin: false
                        }
                    }, $httpProvider);
                } catch (error) {
                    LoggingService.error('msal.init:error');
                    LoggingService.error(error);
                    if (error.indexOf("Url required") !== -1) {
                        for (var i in localStorage) {
                            if (i.indexOf("msal") !== -1 || i.indexOf("clientId") !== -1) {
                                delete localStorage[i];
                            }
                        }
                    }
                }

                var clientApplication = new Msal.UserAgentApplication(
                    AppConfig.b2c.clientID,
                    AppConfig.b2c.authority,
                    msalTokenReceivedCallback(LoggingService), {
                        storeAuthStateInCookie: true,
                        cacheLocation: 'localStorage',
                        logger: msalLogger(LoggingService)
                    }
                );

                function tokenSuccess(token) {
                    //LoggingService.debug('tokenSuccess: ' + token);
                }

                clientApplication.acquireTokenSilent(AppConfig.b2c.b2cScopes, AppConfig.b2c.authority)
                    .then(
                        tokenSuccess,
                        function (error) {
                            if (error.indexOf("user_login_error") !== -1) {
                                clientApplication.loginRedirect(AppConfig.b2c.b2cScopes, AppConfig.b2c.authority);
                            } else {
                                clientApplication.acquireTokenRedirect(AppConfig.b2c.b2cScopes, AppConfig.b2c.authority)
                                    .then(
                                        tokenSuccess,
                                        function (error) {
                                            LoggingService.error('token error: ' + error);
                                        }
                                    );
                            }
                        }
                    );

                function doInterceptors() {
                    $httpProvider.interceptors.push(['$q',
                        function ($q) {
                            return {
                                'request': function (config) {
                                    // LoggingService.debug('outgoing: ');
                                    // LoggingService.debug(config);
                                    var myDefer = $q.defer();
                                    //myDefer.reject('no');
                                    //return;
                                    clientApplication.acquireTokenSilent(AppConfig.b2c.b2cScopes, AppConfig.b2c.authority)
                                        .then(
                                            function (accessToken) {
                                                config.headers['Authorization'] = 'Bearer ' + accessToken;
                                                myDefer.resolve(config);
                                            },
                                            function (error) {
                                                // console.log('----------------- ' + error);
                                                // //if (error.indexOf("user_login_error") !== -1) {
                                                // myDefer.reject(error);
                                                // return;
                                                // }
                                                clientApplication.acquireTokenRedirect(AppConfig.b2c.b2cScopes, AppConfig.b2c.authority)
                                                    .then(
                                                        function (accessToken) {
                                                            config.headers['Authorization'] = 'Bearer ' + accessToken;
                                                            myDefer.resolve(config);
                                                        },
                                                        function (error) {
                                                            console.log("clientApplication.acquireTokenRedirect: Error acquiring the access token to call the Web api:\n" + error);
                                                            myDefer.reject(error);
                                                        });
                                            }
                                        );
                                    return myDefer.promise;
                                },
                                'response': function (response) {
                                    // LoggingService.debug('incoming: ');
                                    // LoggingService.debug(response);

                                    if (angular.isObject(response.data)) {
                                        if (angular.isObject(response.data.meta)) {
                                            if (angular.isDefined(response.data.meta.service_active)) {
                                                if (!response.data.meta.service_active) {
                                                    window.location.reload();
                                                    return;
                                                }
                                            }
                                            if (AppConfig.isLocal) {
                                                if (response.data.meta.error) {
                                                    var err = angular.isDefined(response.config.url) ? response.config.url : 'Error';
                                                    if (err !== 'http://localhost:8080/Lodestar/user/tabauth') {
                                                        LoggingService.error('API Error: ' + err);
                                                        angular.forEach(response.data.meta.logs, function (item) {
                                                            LoggingService.debug(item);
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    return response;
                                }
                            };
                        }
                    ]);
                }

                if (angular.isDefined(localStorage['msal.idtoken'])) {
                    console.log('isDefined');
                    doStates();
                    doInterceptors();
                }
            }
        ]);
}

angular.module('app')
    .run(['$rootScope', 'AppConfig', 'LoggingService', '$trace', '$transitions', 'UserService', '$state',
        function ($rootScope, AppConfig, LoggingService, $trace, $transitions, UserService, $state) {
            // $rootScope.$on('msal:acquireTokenSuccess', function (event, tokenOut) {
            //     LoggingService.info('msal:acquireTokenSuccess: ' + tokenOut);
            // });

            // $rootScope.$on("msal:acquireTokenFailure", function (event, errorDesc, error) {
            //     LoggingService.info('msal:acquireTokenFailure: ' + error);
            // });

            //$trace.enable('TRANSITION');

            $rootScope.$on('refreshUser', function () {
                LoggingService.debug("refreshUser");
                console.log(UserService.hasRole('Super User'));
                if (state === null) return;
                var name = state.name;
                state = null;
                var params = stateParams;
                stateParams = null;
                $state.go(name, params);
            });

            var state = null,
                stateParams = null;

            $transitions.onStart({}, function (transition) {
                var targetState = transition['_targetState'];
                var toState = targetState['_definition'];
                var toParams = targetState['_params'];

                if (!UserService.isAuthenticated()) {
                    // LoggingService.debug("no user");
                    state = toState;
                    stateParams = toParams;
                    return false;
                }
                // console.log('onStart');
                // console.log(targetState);
                // console.log(toState);
                // console.log(toParams);
                // console.log('-------- ' + targetState.name());

                if (targetState.name().indexOf('admin') >= 0 && !UserService.isAdmin())
                    return false;

                return true;
            });

            $transitions.onSuccess({}, function (transition) {
                var targetState = transition['_targetState'];
                var toState = targetState['_definition'];
                var toParams = targetState['_params'];
                // console.log('onSuccess');
                // console.log(targetState);
                // console.log(toState);
                // console.log(toParams);
                // console.log('--------');
                _setLastState = function () {
                    console.log("reload to: " + toState.name);
                    $localStorage['__lsState'] = toState.name;
                    $localStorage['__lsParam'] = toState.params;
                };
                $rootScope.$broadcast('lsStateChange', toState, toState.params);
                return true;
            });
        }
    ]);

require.context("./js/", true, /\.js$/).keys().map(function (val) {
    require('./js/' + val.substring(2));
});