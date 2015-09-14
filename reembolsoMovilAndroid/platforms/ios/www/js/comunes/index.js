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
var pageName = '';
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
        
        
      marcaGA();
        
        
      
 
        
////////////////////////////////////////////
// -----  ESTO ES SOLO PARA ANDROID  -----//
        document.addEventListener("backbutton", function () { 
            navigator.notification.confirm(
                '¿Seguro que deseas salir?', 
                onConfirmQuit, 
                'Atención!!!', 
                'SI,No'  
            );
        }, true); 
//////// FIN SOLO ANDORID /////////////////   


        document.addEventListener("offline", onOffline, false);
     
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        
        
        
        
        console.log('Received Event: ' + id);
    }
};
/*
function onBackKeyDown() {
    //Alert('back');
    window.location = "index.html"; 
}
*/


////////////////////////////////////////////
// -----  ESTO ES SOLO PARA ANDROID  -----//
function onConfirmQuit(button){
    if(button == "1"){
        navigator.app.exitApp(); 
    }
}
//////// FIN SOLO ANDORID /////////////////   


function marcaGA(){
    console.log('se marca con: '+ pageName);
    analytics.startTrackerWithId('UA-48738758-1');
    analytics.trackView(pageName);
}


function onOffline() {
    Alert('No tiene conexion a internet.\nConecte a 3G o WIFI.');
    //navigator.app.exitApp();
}