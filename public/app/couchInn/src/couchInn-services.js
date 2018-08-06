angular.module('couchinn').service(
    'couchinnService',
    [
        '$resource',
        'store',
        'jwtHelper',
        function ($resource, store, jwtHelper) {

          var apiPath = "/user-action/";
          var pathAnonimo = "/api/";
          var adminPath = "/admin/";

          var user = {};
          var tipoHospedaje = {};
          var lodgin = {};
          var pregunta = {};

          this.registerUser = function  (user) {
            /**
             * @param user type JSON{ nombre: String, Apellido: String, email:String, nacimiento: String, password: String }
             * @return: user
             */

           user.username = user.email; // Esto es una decision arbitriaria de la aplicación, el username es el email.
            return $resource(
               '/api/register'
            ).save(user).$promise;

          };

          this.editUser = function (user) {

            return $resource(
              adminPath + 'update/user'
            ).save(user).$promise;
          };

          this.login = function (user) {
            /**
             * @param user type JSON{ username: String, password: String }
             * @return: user
             */
            return $resource(
              '/api/login'
            ).save(user).$promise.then(function (jwt) {
              store.set('token', jwt.token);
              return jwt.token;
            });

          };

          this.logout = function () {
            return $resource(
               '/user-action/logout'
            ).get().$promise.then(function () {
                store.remove('lodgin');
                store.remove('token');
                store.remove('user');
            });
          };

          this.getUser = function (user) {
            return store.get('user');
          };

          this.setUser = function (user) {
            store.set('user', user);
          };


          this.getTipo = function (tipoHospedaje) {
            return store.get('tipoHospedaje');
          };

          this.setTipo = function (tipoHospedaje) {
            store.set('tipoHospedaje', tipoHospedaje);
          };

          this.getPregunta = function (pregunta) {
            return store.get('pregunta');
          };

          this.setPregunta = function (pregunta) {
            store.set('pregunta', pregunta);
          };

          this.getLodgin = function (lodgin) {
            return store.get('lodgin');
          };

          var setLodgin = function (lodgin) {
            store.remove('lodgin');
            store.set('lodgin', lodgin);
          };

          this.setLodgin = setLodgin;

          this.editLodgin = function (lodgin) {
            return $resource(
              apiPath + 'update/lodgin'
             ).save(lodgin).$promise;
          };

          this.guardarTipoHospedaje = function  (tipoHospedaje) {

            return $resource(
              adminPath + 'tipoHospedaje'
            ).save(tipoHospedaje).$promise;

          };

          this.obtenerTiposDeHospedaje = function  (tiposDeHospedaje) {

            return $resource(
              pathAnonimo + 'tiposDeHospedaje'
            ).get().$promise.then(function (response) {
              return response.data;
            });

          };


          this.editTipoHospedaje = function (tipoHospedaje) {
            return $resource(
              adminPath + 'update/tipoHospedaje'
             ).save(tipoHospedaje).$promise;
          };

          this.deleteTipoHospedaje = function (tipoHospedaje) {
            return $resource(
              adminPath + 'delete/tipoHospedaje'
             ).save(tipoHospedaje).$promise;
          };


          this.addLodgin = function  (lodgin) {

            return $resource(
             apiPath + 'lodgin'
            ).save(lodgin).$promise;

          };

          this.getLodgins = function  () {

            return $resource(
              apiPath + 'lodgin'
            ).get().$promise.then(function (response) {
              response.data.forEach(function (lodgin) {
                lodgin.validApplications =
                  lodgin.applications.filter(function (application) {
                    return (application.status != 'rechazada' && moment().isBefore(application.fechaFin));
                  });
              });
              return response.data;
            });

          };

          this.getLodginsByUser = function (user){
            return $resource(
              apiPath + 'lodgin'
            ).get().$promise.then(function (response) {
              return response.data.filter(function (lodgin) {
                  return lodgin.user.username === user.username;
              });
            }).then(function (response) {
              if (!response) return response;
              response.forEach(function (lodgin) {
                lodgin.validApplications =
                  lodgin.applications.filter(function (application) {
                    return (application.status != 'rechazada' && moment().isBefore(application.fechaFin));
                  });
                lodgin.calificarApplications =
                  lodgin.applications.filter(function (application) {
                    return (application.status == 'aceptada' && moment().isAfter(application.fechaFin));
                  });
              });
              return response;
            });
          };

          this.addDonation = function  (donation) {

            return $resource(
             apiPath + 'donation'
            ).save(donation).$promise;

          };

          this.getDonations = function  (user) {

            return $resource(
             apiPath + 'donation'
             ).get().$promise.then(function (response) {
               return response.data.filter(function (donation) {
               return donation.user.username === user.username;
               });
             });
          };

          this.preguntar = function (pregunta) {
            return $resource(
              apiPath + 'preguntar/:nombre/:username', {nombre: pregunta.nombre , username: pregunta.username}
             ).save(pregunta).$promise
          };

          this.responder = function (pregunta) {
            return $resource(
              apiPath + 'responder'
             ).save(pregunta).$promise
          };

          this.getPreguntas = function  (lodgin) {
            return $resource(
              pathAnonimo + 'preguntas/:nombre', {nombre: lodgin.nombre}
            ).get().$promise.then(function (response) {
              return response.data;
            });

          };


          this.solicitar = function (application) {
            return $resource(
             apiPath + 'solicitar/lodgin/:nombre/:username', {nombre: application.nombre , username: application.username}
             ).save(application).$promise
              .then(function (lodgin) {
                setLodgin(lodgin);
                return lodgin;
              });
          };

          this.getApplications = function (user) {
            return $resource(
              apiPath + 'solicitudes/:user', {user: user.username}
            ).get().$promise.then(function (response) {
              return response.data;
            });
          };

          this.rechazarSolicitud = function (application) {
            return $resource(
              apiPath + 'solicitudes/rechazar'
            ).save(application).$promise.then(function (lodgin) {
              setLodgin(lodgin);
              return lodgin;
            });
          };

          this.aceptarSolicitud = function (application) {
            return $resource(
              apiPath + 'solicitudes/aceptar'
            ).save(application).$promise.then(function (lodgin) {
              setLodgin(lodgin);
              return lodgin;
            });
          };

          this.getMisHospedajes = function (user) {
            return $resource(
              apiPath + 'misHospedajes/:user', {user: user.id}
            ).get().$promise.then(function (response) {
              return response.data.filter(function (lodgin) {
                return (lodgin.user.username !== user.username);
              });
            }).then(function (response) {
              if (!response) return response;
              response.forEach(function (lodgin) {
                lodgin.validApplications =
                  lodgin.applications.filter(function (application) {
                    return (application.status != 'rechazada' && moment().isBefore(application.fechaFin));
                  });
                lodgin.calificarApplications =
                  lodgin.applications.filter(function (application) {
                    return (application.status == 'aceptada' && moment().isAfter(application.fechaFin));
                  });
              });
              return response;
            }).then(function (response) {
              return response.filter(function (lodgin) {
                //@todo hacerlo con la fecha de la application
                return moment().isAfter(lodgin.fechaFin);
              })
            });
          };

          this.calificarPublicacion = function (lodgin) {
            return $resource(
              apiPath + 'calificarPublicacion'
             ).save(lodgin).$promise
              .then(function (lodgin) {
                setLodgin(lodgin);
                return lodgin;
              });
          };

          this.calificarHospedador = function (lodgin) {
            return $resource(
              apiPath + 'calificarHospedador'
             ).save(lodgin).$promise
              .then(function (lodgin) {
                setLodgin(lodgin);
                return lodgin;
              });
          };

          this.calificarHuesped = function (lodgin) {
            return $resource(
              apiPath + 'calificarHuesped'
             ).save(lodgin).$promise
              .then(function (lodgin) {
                setLodgin(lodgin);
                return lodgin;
              });
          };




        }
    ]
);
