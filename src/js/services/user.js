(function (ng) {
    'use strict';

    ng.module('app')

        .provider('UserService', ['AppConfig',
            function (AppConfig) {
                this.$get = ['$rootScope', '$http', '$q', 'LoggingService', 'msalAuthenticationService',
                    function ($rootScope, $http, $q, LoggingService, msal) {

                        var _user = null;
                        var _userName = msal.getUser() === null ? '' : (msal.getUser()['idToken']['given_name'] + ' ' + msal.getUser()['idToken']['family_name']);
                        var _roles = [];
                        var _emails;

                        function setup() {
                            $http.get(AppConfig.apiPath + 'user')
                                .then(
                                    function (resp) {
                                        if (!ng.isDefined(resp)) return;
                                        if (!ng.isDefined(resp.data)) return;
                                        if (!ng.isDefined(resp.data.meta)) return;
                                        if (resp.data.meta.error) {
                                            LoggingService.error('Error getting user roles');
                                        } else {
                                            _user = resp.data.result;
                                            console.log(_user);
                                            $rootScope.$broadcast('refreshUser');
                                        }
                                    },
                                    function (resp) {
                                        LoggingService.error('Error getting user roles');
                                    }
                                );

                            $http.get(AppConfig.apiPath + 'emails')
                                .then(
                                    function (resp) {
                                        if (!ng.isDefined(resp)) return;
                                        if (!ng.isDefined(resp.data)) return;
                                        if (!ng.isDefined(resp.data.meta)) return;
                                        if (resp.data.meta.error) {
                                            LoggingService.error('Error getting user emails');
                                        } else {
                                            _emails = resp.data.result;
                                        }
                                    },
                                    function (resp) {
                                        LoggingService.error('Error getting user emails');
                                    }
                                );
                        }

                        //setup();

                        return {
                            name: _userName,

                            roles: _user === null ? [] : _user.roles,

                            isAuthenticated: function () {
                                return _user !== null;
                            },

                            //isInternal: _user === null ? false : _user.isInternal,
                            isAdmin: function () {
                                return _user === null ? false : _user.isInternal;
                            },

                            hasRole: function (role) {
                                if (!ng.isObject(_user)) return false;
                                if (!ng.isArray(_user.roles)) return false;
                                var has = false;
                                _.find(_user.roles, function (item) {
                                    if (item.name === role) has = true;
                                });
                                return has;
                            },

                            getEmails: function () {
                                var myDefer = $q.defer();

                                if (ng.isArray(_emails)) {
                                    myDefer.resolve(_emails);
                                } else {
                                    $http.get(AppConfig.apiPath + 'emails')
                                        .then(
                                            function (resp) {
                                                //resp = {data:{meta:{error:false},result:[] }};
                                                if (resp.data.meta.error) {
                                                    myDefer.reject('Error getting user emails');
                                                } else {
                                                    _emails = resp.data.result;
                                                    myDefer.resolve(_emails);
                                                }
                                            },
                                            function (resp) {
                                                myDefer.reject('Error getting user emails');
                                            }
                                        );
                                }

                                return myDefer.promise;
                            }
                        };
                    }
                ];
            }
        ])
        .factory('UserServiceOld', ['$rootScope', '$http', '$q', 'LoggingService', 'AppConfig', 'msalAuthenticationService',
            function ($rootScope, $http, $q, LoggingService, AppConfig, msal) {

                var _user = null;
                var _userName = msal.getUser() === null ? '' : msal.getUser().name;

                return {
                    name: _userName,


                    //isInternal: _user === null ? false : _user.isInternal,
                    isAdmin: function () {
                        return _user === null ? false : _user.isInternal;
                    },

                    getEmails: function () {
                        var myDefer = $q.defer();

                        if (ng.isArray(_emails)) {
                            myDefer.resolve(_emails);
                        } else {
                            $http.get(AppConfig.apiPath + 'emails')
                                .then(
                                    function (resp) {
                                        //resp = {data:{meta:{error:false},result:[] }};
                                        if (resp.data.meta.error) {
                                            myDefer.reject('Error getting user emails');
                                        } else {
                                            _emails = resp.data.result;
                                            myDefer.resolve(_emails);
                                        }
                                    },
                                    function (resp) {
                                        myDefer.reject('Error getting user emails');
                                    }
                                );
                        }

                        return myDefer.promise;
                    }
                };
            }
        ])

    ;

})(angular);