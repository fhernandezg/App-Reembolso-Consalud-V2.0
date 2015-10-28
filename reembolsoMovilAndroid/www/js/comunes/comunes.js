//Google Analitycs ID AU-25575058-6

// Cambiar ambiente.
// 0 = testing ; 1 = produccion
var ambiente = 1; 

// URL de los servicios.
var urlBase = (ambiente === 1) 
    ? 'http://redsalud.consalud.cl'
    : 'http://tredsalud.consalud.cl';

var urlSGW      = urlBase + '/sfc/sgw.asmx';
var urlSGWTK    = urlBase + '/sfc/sgw_md.asmx';
var urlMobile   = urlBase + '/Mobile/ServicioAfiliadoConsalud.asmx';

var rut = 0;
var debug = '';
var nombreArchivo = '';
var noEsusuario=0;
var reintentos = 0;

$(window).unload(function() {
    $.mobile.showPageLoadingMsg();
});

$(document).ready(function() {
    var vence = '';
    vence = localStorage.getItem('venceTicket');
    if (!localStorage.venceTicket) {

    } else {
        if (vence == null) {
            //cerrarSesionTimeOut();
        } else {
            
            var fechaVence = vence.split(' '); // 12/13/2013 4:37:36 PM
            //alert(fechaVence[0]);
            var fechaVen = fechaVence[0].split('/');
            //Number(fechaVen[2]) Año    Number(fechaVen[0]) Mes     Number(fechaVen[1]) Dia ;
            if(fechaVen[0]<10){
                fechaVen[0] = 0 + fechaVen[0];
            }
            if(fechaVen[1]<10){
                fechaVen[1] = 0 + fechaVen[1];
            }
            var fechaVenNum = fechaVen[2]+''+fechaVen[0]+''+fechaVen[1];
            fechaVenNum = Number(fechaVenNum);
            //alert(fechaVenNum);

            var f = new Date();
            var mes = f.getMonth() + 1;
            if (mes < 10) {
                mes = 0 + '' + mes;
            }
            var diah = f.getDate();
            //alert(f.getDate());
            if (diah < 10) {
                diah = 0 + '' + diah;
            }
            var fechaHoyNum = f.getFullYear()+''+mes+''+diah;
            fechaHoyNum = Number(fechaHoyNum);


            if (fechaHoyNum <= fechaVenNum ) {
                //alert(fechaHoyNum+' < '+fechaVenNum);
            } else {
                //alert('Expiro la sesion: '+fechaHoyNum+' > '+fechaVenNum);
                localStorage.setItem('venceTicket',null);
                cerrarSesionTimeOut();
            }




        }
    }
});


//variables por get en JS
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    console.log(vars);
    return vars;
}
function alertDismissed() {
    
//window.location = "menu.html";
}
function processError(data, status) {
    console.log(data);
    console.log(status);
    navigator.notification.confirm(
            'Lo sentimos no se pudo realizar la operación. Por favor, verifique su conexión a red de datos.', // message
            onConfirmOK, 
            'Atención!!!', 
            'Ok'  
        );
    $.mobile.hidePageLoadingMsg();

    return false;
}

function onConfirmOK(buttonIndex){
    //alert(buttonIndex);reintentos
    document.location.reload(true);
}

function processErrorSinReload(data, status) {
    navigator.notification.confirm(
            'Lo sentimos no se pudo realizar la operación. Por favor, verifique su conexión a red de datos.', // message
            onConfirmOKSinReload, 
            'Atención!!!', 
            'Ok'  
        );
    $.mobile.hidePageLoadingMsg();

    return false;
}

function onConfirmOKSinReload(buttonIndex){
    noEsusuario = noEsusuario + 1;
    if(noEsusuario > 3){
        Alert('Comunicate al 600 500 9000');
        noEsusuario = 0;
    }
    //alert(buttonIndex);
    //document.location.reload(true);
}
// posiciona el scroll de la pagina
function scrollWinTop(top) {
    $('.contentenido').animate({
        scrollTop: top
    }, 500);
}
function cerrarSesion() {
 navigator.notification.confirm(
            '¿Estas seguro de cerrar sesión?',
            onConfirmExit, 
            'Atención!!!', 
            'Ok,Cancelar'  
        );
}
function onConfirmExit(buttonIndex){
    if(buttonIndex==1){
        $.mobile.hidePageLoadingMsg();
        localStorage.removeItem('usuario');
        localStorage.removeItem('password');
        localStorage.removeItem('ticket');
        window.location = '../login.html';
    }
}

function cerrarSesionTimeOut() {
    $.mobile.hidePageLoadingMsg();
    localStorage.removeItem('usuario');
    localStorage.removeItem('password');
    localStorage.removeItem('ticket');
    localStorage.removeItem('venceTicket');
    var path = document.URL;
    var parts = path.split('/');
    var n = parts.length;
    //alert(parts[n-1]);
    if (parts[n - 1] == 'login.html') {

    } else {
        window.location = '../login.html';
    }

}

function validaFinSesion() {
    /* if (!localStorage.venceTicket) {

    } else {
        var fechaVence = localStorage.venceTicket.split(' '); // 12/13/2013 4:37:36 PM
        //alert(fechaVence[0]);
        var fechaV = fechaVence[0].split('/');
        var x = new Date();
        x.setFullYear(fechaV[2], fechaV[0], fechaV[1]);

        var today = new Date();

        if (x > today) {
            cerrarSesion();
        }

    */
}

function separaRut(rutCompleto) {
    var tmp = rutCompleto.split('-');
    //var digv = tmp[1];
    //var rut = tmp[0];
    return tmp;

}

function Alert(msj) {

    navigator.notification.alert(
            msj, // message
            alertDismissed, // callback
            'Atención!!!', // title
            'Ok'                  // buttonName
            );
    //navigator.notification.vibrate(1000); vibracion en las alertas
}

// process the confirmation dialog result
function onConfirm(buttonIndex) {
    //alert('You selected button ' + buttonIndex);

}
//calcular la edad de una persona 
//recibe la fecha como un string en formato espa��ol 
//devuelve un entero con la edad. Devuelve false en caso de que la fecha sea incorrecta o mayor que el dia actual 
function calcularEdad(fecha) {

    var hoy = new Date();
    var array_fecha = fecha.split("/");
    if (array_fecha.length != 3)
        return false;

    var ano;
    ano = parseInt(array_fecha[2]);
    if (isNaN(ano))
        return false;

    var mes;
    mes = parseInt(array_fecha[1]);
    if (isNaN(mes))
        return false;

    var dia;
    dia = parseInt(array_fecha[0]);
    if (isNaN(dia))
        return false;

    if (ano <= 99)
        ano += 1900;

    //alert('a��o: '+ano+' Mes: '+mes+' dia: '+dia);
    //alert(hoy.getFullYear()+"-"+ ano+" -  1");
    edad = hoy.getFullYear() - ano - 1; //-1 porque no se si ha cumplido a��os ya este a��o 

    if (hoy.getMonth() + 1 - mes < 0) //+ 1 porque los meses empiezan en 0 
        return edad;
    if (hoy.getMonth() + 1 - mes > 0)
        return edad + 1;

    if (hoy.getUTCDate() - dia >= 0)
        return edad + 1;

    return edad;
}


function setFechaDMA(fecha) { //Tiene que venir en formato 1984-03-26T00:00:00 
    var fech = fecha.split("T");
    var fechaAux = fech[0].split("-");
    var fechaDMA = fechaAux[2] + '/' + fechaAux[1] + '/' + fechaAux[0];
    return fechaDMA;
}

//funcion Valida RUT
var Fn = {
    validaRut: function(rutCompleto) {
        if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto)) {
            return false;
        }
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];

        if (digv == 'K') {
            digv = 'k';
        }
        var digesto = Fn.dv(rut);
        if (digesto == digv) {
            return true;
        } else {
            return false;
        }
    },
    dv: function(T) {
        var M = 0, S = 1;
        for (; T; T = Math.floor(T / 10)) {
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        }
        return S ? S - 1 : 'k';
    }
}

//Funcion caracteres permitidos
function permite(elEvento, permitidos) {
    // Variables que definen los caracteres permitidos
    var numeros = "0123456789-";
    var caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var numeros_caracteres = numeros + caracteres;
    var teclas_especiales = [8, 37, 39, 46];
    // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha


    
    // Seleccionar los caracteres a partir del par��metro de la funci��n
    switch (permitidos) {
        case 'num':
            permitidos = numeros;
            break;
        case 'car':
            permitidos = caracteres;
            break;
        case 'num_car':
            permitidos = numeros_caracteres;
            break;
    }

    // Obtener la tecla pulsada 
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);

    // Comprobar si la tecla pulsada es alguna de las teclas especiales
    // (teclas de borrado y flechas horizontales)
    var tecla_especial = false;
    for (var i in teclas_especiales) {
        if (codigoCaracter == teclas_especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
    // o si es una tecla especial
    return permitidos.indexOf(caracter) != -1 || tecla_especial;
}



//######################################################## debug con archivo TXT ###########################################################
// o bien escribe la cadena que le pase en un TXT :D
function iniciaDebug(log, nombreArch) {
    nombreArchivo = nombreArch;
    debug = log;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {
    fileSystem.root.getFile(nombreArchivo + ".txt", {create: true, exclusive: false}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}
function gotFileWriter(writer) {
    writer.onwrite = function(evt) {
    };
    writer.seek(writer.length);
    writer.write(debug); //variable debug creada publicamente
}
function fail(error) {
    console.log(error.code);
}
//######################################################## FIN debug con archivo TXT ########################################################


function codificarUtf8(texto) {
    texto = texto.replace("ñ", "&#241;");
    texto = texto.replace("Ñ", "&#209;");
    texto = texto.replace("á", "&#225;");
    texto = texto.replace("é", "&#233;");
    texto = texto.replace("í", "&#205;");
    texto = texto.replace("ó", "&#243;");
    texto = texto.replace("ú", "&#250;");
    texto = texto.replace("Á", "&#193;");
    texto = texto.replace("É", "&#201");
    texto = texto.replace("Í", "&#237;");
    texto = texto.replace("Ó", "&#211;");
    texto = texto.replace("Ú", "&#218;");
    //alert(texto);
    return texto;

}