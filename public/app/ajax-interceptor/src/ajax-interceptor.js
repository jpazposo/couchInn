'use strict';

angular.module('ajaxInterceptor', [])
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push(
                [
                    '$q',
                    '$injector',
                    'store',
                    function ($q, $injector, store) {
                      return {
                        'request': function (config) {
                          config.headers = config.headers || {};
                          if (store.get('token')) {
                            config.headers.Authorization = store.get('token');
                          }
                          return config;
                        }
                      };
                    }
                ]
            );
        }
    ]
);
