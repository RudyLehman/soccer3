/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    },

    takePicture: function() {
      navigator.camera.getPicture(
      function( imageURI ) {
        alert( imageURI );
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
    },

//    setOrientation: function() {
//        window.plugins.orientationchanger.lockOrientation('landscape');
//        var currentOrientation = window.plugins.orientationchanger.getOrientation();
//        alert(currentOrientation);
//    },

    getLocation: function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                latitud = position.coords.latitude;
                longitud = position.coords.longitude;
                alert(latitud);
            }, function (error) {
                alert("GeoLocation error: " + error);
            }, {
                maximumAge: 3000,
                timeout: 15000,
                enableHighAccuracy: true
            });

        } else {
            alert("Oops! Your browser does not support geolocation. Chrome download, it's free!");
        }

    },

    scanBarcode: function() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    },
    flashlightOn: function(){
        window.plugins.flashlight.available(function(isAvailable) {
            if (isAvailable) {

                // switch on
                window.plugins.flashlight.switchOn(); // success/error callbacks may be passed

                // switch off after 3 seconds
                setTimeout(function() {
                    window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
                }, 3000);

            } else {
                alert("Flashlight not available on this device");
            }
        });
    }
};
