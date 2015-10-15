
var ref;
var term = new Array();
var terminos = new Array();
var ticket = '';
var email = '';
var vencimiento = '';
var rTemporal = '';

$(document).ready(function() {
    //detector de Enter en un elemento.
    $("#rut").keypress(function(e) {
        if (e.which == 13) {
            login();
        }
    })
    $("#password").keypress(function(e) {
        if (e.which == 13) {
            login();
        }
    })


    $("#logear").click(function() {
        login();
    });
    
    $("#cambiarClaveBtn").click(function() {
        cambioClave();
    });

    $("#enviarClave").click(function() {
        enviarClave();
    });

    


});

$(document).on('pagecreate', '#loginHome', function() {
    if (localStorage.usuario) {
        if(!localStorage.terminos){
            window.location="html/terminos.html";
            //alert('1');
        } else {
            term = localStorage.getItem('terminos') ;
            terminos = term.split(",");
            var rutCompleto = localStorage.usuario;
            //alert(terminos[1]+' --- '+localStorage.usuario +' --- '+terminos.indexOf(rutCompleto));
            //Alert(terminos.indexOf(rut));
            if (terminos.indexOf(rutCompleto) != -1) { 
                //TODO aca validar termino de la sesion por caducidad
                window.location = 'html/menu.html';
            }else{
                window.location="html/terminos.html";
            }
        }
    }
});
function setGionRut(){
    if($('#rut').val()!=''){
        var rutTemp= $('#rut').val();
        rutTemp = rutTemp.replace('-','');
        var digTemp = rutTemp.substring(rutTemp.length-1, rutTemp.length);
        rutTemp = rutTemp.substring(0,rutTemp.length-1);
        $('#rut').val(rutTemp+'-'+digTemp);
        $('#rutClave').val(rutTemp+'-'+digTemp);
    }
    
}
function setGionRutClave(){
    if($('#rutClave').val()!=''){
        var rutTemp= $('#rutClave').val();
        rutTemp = rutTemp.replace('-','');
        var digTemp = rutTemp.substring(rutTemp.length-1, rutTemp.length);
        rutTemp = rutTemp.substring(0,rutTemp.length-1);
        $('#rut').val(rutTemp+'-'+digTemp);
        $('#rutClave').val(rutTemp+'-'+digTemp);
    }
    
}
// ******  Validacion de usuario para el inicio de sesion.   **********************
function login() {
    console.log(urlSGWTK + "?op=AutenticarBaseDatos");
    
    $.mobile.showPageLoadingMsg();
    if (($("#rut").val() != '') && ($("#password").val() != '')) {
        if (!Fn.validaRut($('#rut').val())) {
            $.mobile.hidePageLoadingMsg();
            Alert("El Rut ingresado no es válido debe ser en formato: xxxxxxxx-x ");
            return false;
        } else {
            rut = separaRut($("#rut").val());
            var soapRequestLogin =
            '<?xml version="1.0" encoding="utf-8"?>\n\
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
            <soap:Header>\n\
              <HeaderMobileService xmlns="Consalud.Framework.DMZ.Servicios">\n\
                <User>enlacedesign</User>\n\
                <Token>EC70B944766F551DB25A7765CAB94084</Token>\n\
                <Ticket></Ticket>\n\
              </HeaderMobileService>\n\
            </soap:Header>\n\
            <soap:Body>\n\
              <AutenticarBaseDatos xmlns="Consalud.Framework.DMZ.Servicios">\n\
                <RutUsuario>' + rut[0] + '</RutUsuario>\n\
                <Contrasena>' + $("#password").val() + '</Contrasena>\n\
              </AutenticarBaseDatos>\n\
            </soap:Body>\n\
          </soap:Envelope>';
            $.ajax({
                type: "POST",
                url: urlSGWTK + "?op=AutenticarBaseDatos",
                contentType: "text/xml",
                dataType: "xml",
                data: soapRequestLogin,
                success:function (data, status, req) {
                        if (status == "success") {
                     
                                    ticket = $(req.responseXML).find('Tiket').text();
                                    vencimiento = $(req.responseXML).find('Vencimiento').text();
                                    //alert(vencimiento);
                                    localStorage.setItem('tickets',ticket);
                                    localStorage.setItem('venceTicket',vencimiento);
                                if( ticket == '') {
                                    //Alert('constraseña incorrecta');
                                    // Validacion de usuario requiere cambio de clave!! , es uncorrecta o no existe
                                    //alert(localStorage.getItem('tickets'));
                                    UsuariosPorUsername(2);
                                } else { 
                                    
                                    if(ticket == ''){
                                        $.mobile.hidePageLoadingMsg();
                                        Alert('El servicio no esta disponible, Intente mas tarde. ' );
                                        //window.location = 'menu.html';
                                        return false;
                                    }else{
                                        localStorage.setItem('tickets',ticket);
                                        localStorage.setItem('venceTicket',vencimiento);
                                        
                                        //Alert(localStorage.getItem('tickets') +' vence el: '+ localStorage.getItem('venceTicket')  );
                                        UsuariosPorUsername(1);
                                        //return true;
                                    }
                                       
                                   
                                }
                                
                        }

                },
                error: processError
            });

        }
    } else {
        $.mobile.hidePageLoadingMsg();
        Alert('Ingresa tus datos');
    }

}

function UsuariosPorUsername(tipo) {
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
  <soap:Header> \n\
    <HeaderMobileService xmlns="Consalud.Framework.DMZ.Servicios"> \n\
      <User>enlacedesign</User> \n\
      <Token>79DB387D3BD684BE5E37EB499A10662B</Token> \n\
      <Ticket>' + localStorage.getItem('tickets') + '</Ticket> \n\
    </HeaderMobileService >\n\
  </soap:Header> \n\
  <soap:Body> \n\
    <UsuariosPorUsername xmlns="Consalud.Framework.DMZ.Servicios"> \n\
      <Rut>' + rut[0] + '</Rut> \n\
    </UsuariosPorUsername> \n\
  </soap:Body> \n\
  </soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlSGWTK + "?op=UsuariosPorUsername",
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: function(data, status, req) {
                    $.mobile.showPageLoadingMsg();
                    if (status == "success") {
                        var resultado = $(req.responseXML).find('RequiereCambioClave').text();
                        //alert(resultado);
                        if (resultado != '') {
                            //Alert("cambiar clave? "+resultado+" tipo: "+tipo);
                            email = $(req.responseXML).find('Email').text();
                            if((resultado == 'true')&&(tipo==1)){ //logueo exitoso pero requiere cambio de clave
                                 Alert('Requiere cambio de clave');
                                 //$("#passwordAC").val($("#password").val());
                                 var direccion = 'cambioClave.html?rut='+$('#rut').val()+'&pass='+$("#password").val();
                                 //alert(direccion);
                                 window.location = direccion;
                            }else{
                                //alert(tipo);
                                if(tipo == 1){ // logueo exitoso
                                    localStorage.setItem('usuario',$('#rut').val());
                                    localStorage.setItem('password',$('#password').val());
                                    
                                    if(!localStorage.terminos){
                                        //getTerminos();
                                        window.location="html/terminos.html";
                                    } else {
                                        term = localStorage.getItem('terminos') ;
                                        terminos = term.split(",");
                                        var rutCompleto = $('#rut').val();
                                        //Alert(terminos.indexOf(rut));
                                        if (terminos.indexOf(rutCompleto) != -1) { 
                                            
                                            window.location = 'html/menu.html';
                                            
                                        } else {
                                            //getTerminos();
                                            window.location="html/terminos.html";
                                        }
                                    } 
                                   
                                }else{ //no esta correcta la contraseña o el usuario
                                    Alert('Usuario o contraseña incorrecto!'); 
                                    $.mobile.hidePageLoadingMsg();
                                    $("#password").val('');
                                }
                            }
                        } else {
                            Alert('Usuario o contraseña incorrecto!'); 
                            $.mobile.hidePageLoadingMsg();
                            $("#password").val('');
                            //El servicio de DNN no existe ahora
                            //validar si existe el usuario en el sistema.
                            //getLogonDNN();  //(aca llega el rut de eduardo costella
                        }
                        
                    }
        },
        error: processError
    });
}

// ***** FIN Validacion de usuario para el inicio de sesion.    **********************


// ******  Envio de clave al usuario.   **********************
function enviarClave() {
    $.mobile.showPageLoadingMsg();
    if ($("#rutClave").val() != '') {
        if (!Fn.validaRut($("#rutClave").val())) {
            $.mobile.hidePageLoadingMsg();
            Alert("El Rut ingresado no es válido debe ser en formato: xxxxxxxx-x ");
            return false;
        } else {
            rut = separaRut($("#rutClave").val());
            if ($('input[name=tipoDeEnvio]:checked').val() == 'mail')
            {
                var soapRequestEnviaClaveMail =
                        '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Header>' +
                        '<HeaderDMZService xmlns="Consalud.Framework.DMZ.Servicios">' +
                        '<User>enlacedesign</User>' +
                        '<Token>54CADC472B72CA560924D70D8CE37D00</Token>' +
                        '</HeaderDMZService>' +
                        '</soap:Header>' +
                        '<soap:Body>' +
                        '<SendPassword xmlns="Consalud.Framework.DMZ.Servicios">' +
                        '<Rut>' + rut[0] + '</Rut>' +
                        '<dVerificador>' + rut[1] + '</dVerificador>' +
                        '</SendPassword>' +
                        '</soap:Body>' +
                        '</soap:Envelope>';
                $.ajax({
                    type: "POST",
                    url: urlSGW + "?op=SendPassword",
                    contentType: "text/xml",
                    dataType: "xml",
                    data: soapRequestEnviaClaveMail,
                    success: processSuccessEnviaClaveMail,
                    error: processErrorSinReload
                });
            } //XML MAIL
            else
            {
                var soapRequestEnviaClaveSms =
                        '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Header>' +
                        '<HeaderDMZService xmlns="Consalud.Framework.DMZ.Servicios">' +
                        '<User>enlacedesign</User>' +
                        '<Token>54CADC472B72CA56B76C9902DDAE13C3</Token>' +
                        '</HeaderDMZService>' +
                        '</soap:Header>' +
                        '<soap:Body>' +
                        '<SendPasswordSMS xmlns="Consalud.Framework.DMZ.Servicios">' +
                        '<Rut>' + rut[0] + '</Rut>' +
                        '<dVerificador>' + rut[1] + '</dVerificador>' +
                        '</SendPasswordSMS>' +
                        '</soap:Body>' +
                        '</soap:Envelope>';
                $.ajax({
                    type: "POST",
                    url: urlSGW + "?op=SendPasswordSMS",
                    contentType: "text/xml",
                    dataType: "xml",
                    data: soapRequestEnviaClaveSms,
                    success: processSuccessEnviaClaveSms,
                    error: processErrorSinReload
                });
            }//xml SMS

        }
    } else {
        $.mobile.hidePageLoadingMsg();
        Alert('Ingresa tus datos');
    }

}
function processSuccessEnviaClaveMail(data, status, req) {

    if (status == "success") {
        var resultado = $(req.responseXML).find('SendPasswordResult').text();
        //Alert(resultado);
        if (resultado != '') {
            $.mobile.hidePageLoadingMsg();
            Alert('Se ha enviado una clave temporal de acceso a su email registrado en nuestras bases.\nSi no recibes el Mail con la clave en 5 minutos, por favor comunícate al 600 500 9000 para actualizar tu email y resetear tu clave.');
            $('#rut').val($('#rutClave').val());
            $('#password').val('');
            //$('#password').val(resultado);
            window.location = 'login.html';
        } else {
            $.mobile.hidePageLoadingMsg();
            Alert('El servicio no esta disponible, Intente mas tarde. ');
            
            //window.location = 'menu.html';
            return false;
        }
    }

}
function processSuccessEnviaClaveSms(data, status, req) {

    if (status == "success") {
        var resultado = $(req.responseXML).find('SendPasswordSMSResult').text();
        //Alert(resultado);
        console.log(resultado);
        if (resultado != '') {
            $.mobile.hidePageLoadingMsg();
            Alert('Se ha enviado una clave temporal de acceso vía SMS al celular registrado en nuestras bases.\nSi no recibes el SMS con la clave en 5 minutos, por favor comunícate al 600 500 9000 para actualizar tu número de celular y resetear tu clave.');
            $('#rut').val($('#rutClave').val());
            $('#password').val('');
            //$('#password').val(resultado);
            window.location = 'login.html';

            //return true;
        } else {
            $.mobile.hidePageLoadingMsg();
            Alert('El servicio no esta disponible, Intente mas tarde. ');
            
            //window.location = 'menu.html';
            return false;
        }
    }

}

// ****** FIN  Envio de clave al usuario.   **********************

// EL RUT TIENE QUE LLEGAR POR SESION EN EL SOAP, SOLO SE TENDRIA QUE MANDAR LAS CLAVES NUEVAS MAS EL TICKET
function cambioClave(){  
     $.mobile.showPageLoadingMsg();
     if(rut[0]==null){
         rut = separaRut(rut);
     }
    if($("#passwordCC").val().length >= 6){
        if($("#passwordCC").val() == $("#passwordCC2").val() ){
            var soapRequest =
            '<?xml version="1.0" encoding="utf-8"?> \n\
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
              <soap:Header> \n\
                <HeaderMobileService xmlns="Consalud.Framework.DMZ.Servicios"> \n\
                  <User>enlacedesign</User> \n\
                  <Token>5005457BB30D73F1B0035999816D2134</Token> \n\
                  <Ticket>' + localStorage.getItem('tickets') + '</Ticket> \n\
                </HeaderMobileService> \n\
              </soap:Header> \n\
              <soap:Body> \n\
                <CambiaClave xmlns="Consalud.Framework.DMZ.Servicios"> \n\
                  <pRut>'+rut[0]+'</pRut> \n\
                  <pClaveActual>'+$("#passwordAC").val()+'</pClaveActual> \n\
                  <pClaveNueva>'+$("#passwordCC").val()+'</pClaveNueva> \n\
                </CambiaClave> \n\
              </soap:Body> \n\
            </soap:Envelope>';
            $.ajax({
                type: "POST",
                url: urlSGWTK + "?op=CambiaClave",
                contentType: "text/xml",
                dataType: "xml",
                data: soapRequest,
                success: function(data, status, req) {
                             $.mobile.showPageLoadingMsg();
                            if (status == "success") {
                                var resultado = $(req.responseXML).find('CambiaClaveResult').text();
                                if (resultado != '') {
                                    if(resultado == 'true'){
                                        Alert('Se cambia la clave correctamente');
                                        $("#password").val('');
                                        window.location = 'login.html';  
                                    }else{
                                        Alert('La clave actual es incorrecta!'); 
                                        $.mobile.hidePageLoadingMsg();
                                    }
                                } else {
                                    Alert('Intentelo mas tarde o comunicate al 600 500 9000');  
                                }
                                 $.mobile.hidePageLoadingMsg();
                            }
                },
                error: processError
            });
        }else{
            Alert('La nueva clave no coincide!!!');
            $("#passwordCC").val('');
            $("#passwordCC2").val('');
            $.mobile.hidePageLoadingMsg();
        }
    }else{
        Alert('La nueva clave tiene que contener al menos 6 caracteres');
        $("#passwordCC").val('');
        $("#passwordCC2").val('');
        $.mobile.hidePageLoadingMsg();
    }
}
/*
function setClaveDNN(){
    var soapRequest =
        '<?xml version="1.0" encoding="utf-8"?> \n\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
        <soap:Header> \n\
          <HeaderMobileService xmlns="Consalud.Framework.DMZ.Servicios"> \n\
            <User>enlacedesign</User> \n\
            <Token>760134A3B9C3FAA0A58B843F4543D5DF</Token> \n\
            <Ticket>' + localStorage.getItem('tickets') + '</Ticket> \n\
          </HeaderMobileService> \n\
        </soap:Header> \n\
        <soap:Body> \n\
          <setClaveDNN xmlns="Consalud.Framework.DMZ.Servicios"> \n\
            <SistemaOwner>0</SistemaOwner> \n\
            <Rut>'+rut[0]+'</Rut> \n\
            <Pwd>'+$("#passwordCC").val()+'</Pwd> \n\
            <Mail>'+email+'</Mail> \n\
          </setClaveDNN> \n\
        </soap:Body> \n\
      </soap:Envelope>';
    iniciaDebug(soapRequest,'setClaveDNN');
    $.ajax({
        type: "POST",
        url: urlSGWTK + "?op=setClaveDNN",
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: function(data, status, req) {
                     $.mobile.showPageLoadingMsg();
                    if (status == "success") {
                        var resultado = $(req.responseXML).find('setClaveDNNResult').text();
                        if (resultado != '') {
                            if(resultado == 'true'){
                                Alert('Se cambia la clave correctamente');
                                $("#password").val('');
                                window.location = '#loginHome';    
                            }else{
                                Alert('La clave actual DNN es incorrecta !'); 
                                $.mobile.hidePageLoadingMsg();
                            }
                        } else {
                            Alert('Intentelo mas tarde o comunicate al 600 500 9000');  
                        }
                         $.mobile.hidePageLoadingMsg();
                    }
        },
        error: processError
    });
    
}
*/
function getLogonDNN(){
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
    <soap:Header> \n\
      <HeaderDMZService xmlns="Consalud.Framework.DMZ.Servicios"> \n\
        <User>enlacedesign</User> \n\
        <Token>50418E243492833868BA7169FC79BDEC</Token> \n\
      </HeaderDMZService> \n\
    </soap:Header> \n\
    <soap:Body> \n\
      <getLogonDNN xmlns="Consalud.Framework.DMZ.Servicios"> \n\
        <SistemaOwner>0</SistemaOwner> \n\
        <Rut>'+rut[0]+''+rut[1]+'</Rut> \n\
        <Pwd>1</Pwd> \n\
      </getLogonDNN> \n\
    </soap:Body> \n\
  </soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlSGW + "?op=getLogonDNN",
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: function(data, status, req) {
                     $.mobile.showPageLoadingMsg();
                    if (status == "success") {
                        var resultado = $(req.responseXML).find('Username').text();
                        if (resultado != '') {
                            $("#rut").val('');
                            $("#password").val('');
                            $("#rutClave").val('');
                            Alert('Comunicate al 600 500 9000 (1)');
                            /*
                            navigator.notification.confirm(
                               'No existes como usuario web, te redireccionaremos a nuestra web para iniciar sesión por primera vez. Luego podrás volver y utilizar nuestra App Móvil, si prefieres comunicate al 600 500 9000.',  // message
                                function (buttonIndex) {
                                //alert('You selected button ' + buttonIndex);
                                    if(buttonIndex){
                                        ref = window.open('http://tclientes.consalud.cl/', '_system', 'location=yes');
                                    }
                            
                                },              // callback to invoke with index of button pressed
                                'Atención!!!',            // title
                                'OK'          // buttonLabels
                            );*/
                    } else {
                            Alert('Clave incorrecta');
                            $("#rut").val('');
                            $("#password").val('');
                            $("#rutClave").val('');
                            
                            
                        
                            
                        }
                         $.mobile.hidePageLoadingMsg();
                    }
        },
        error: processError
    });
}

