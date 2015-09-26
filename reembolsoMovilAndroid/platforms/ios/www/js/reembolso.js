function irApaginaConBackBtn(){
    window.location = 'menu_reembolso.html';
}
var cantidadDeFotos = 2;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var codeImg1='';
var codeImg2='';
var beneficiario = new Array();
var beneficiarioSelect = new Array();
var tipoCuentaSeleccionada = '';
var idBancoSeleccionado = '';
var idTitularArray = -1;
var msjVarDepo = 0;
var idReembolso = 0;
var rutBeneficiario = 0;
var formaPagoReembolso = 0;
var tipoReembolso = localStorage.getItem('tipoReembolso');
var nombreBanco = '';
localStorage.codeImg1 ='';
localStorage.codeImg2 ='';
localStorage.codeImg3 ='';
rut = separaRut(localStorage.getItem('usuario'));
var mensajeFoto = 0;

// - INICIO js de la toma de fotos

function onFail(message) {
  Alert('Imagen no seleccionada');
}
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function msjDepo(){
    if(msjVarDepo == 0 ){
        msjVarDepo = 1;
        Alert('Los depósitos en Cta. Cte., se harán a nombre del titular, de no coincidir el nombre se generara un vale vista correspondiente.');
    }
}
function capturePhoto1Click() {
    navigator.notification.confirm(
            'Procure tomar una imagen lo más nítida posible, de lo contrario Isapre Consalud no podrá procesar su reembolso de forma expedita.', 
            onConfirm, 
            'Atención!!!', 
            'Ok'  
        );
}
function onConfirm(buttonIndex){
    //alert(buttonIndex);
    capturePhoto1();
}
function capturePhoto1() {
        
        navigator.camera.getPicture(onPhotoDataSuccess1, onFail, { 
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600
    });
}
function onPhotoDataSuccess1(imageData) {
    localStorage.codeImg1 = imageData;
    imageData='';
    var smallImage1 = document.getElementById('smallImage1');
    smallImage1.style.display = 'block';
    smallImage1.src = "data:image/jpeg;base64," + localStorage.codeImg1;

}
function capturePhoto2Click() {
    navigator.notification.confirm(
            'Procure tomar una imagen lo más nítida posible, de lo contrario Isapre Consalud no podrá procesar su reembolso de forma expedita.', 
            onConfirm2, 
            'Atención!!!', 
            'Ok'  
        );
}
function onConfirm2(buttonIndex){
    //alert(buttonIndex);
    capturePhoto2();
}
function capturePhoto2() {
    navigator.camera.getPicture(onPhotoDataSuccess2, onFail, { 
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600});
}
function onPhotoDataSuccess2(imageData) {
    localStorage.codeImg2 = imageData;
    imageData='';
    var smallImage2 = document.getElementById('smallImage2');
    smallImage2.style.display = 'block';
    smallImage2.src = "data:image/jpeg;base64," + localStorage.codeImg2;

}




function capturePhoto3Click() {
    navigator.notification.confirm(
            'Procure tomar una imagen lo más nítida posible, de lo contrario Isapre Consalud no podrá procesar su reembolso de forma expedita.', 
            onConfirm3, 
            'Atención!!!', 
            'Ok'  
        );
}
function onConfirm3(buttonIndex){
    //alert(buttonIndex);
    capturePhoto3();
}
function capturePhoto3() {
    navigator.camera.getPicture(onPhotoDataSuccess3, onFail, { 
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600});
}
function onPhotoDataSuccess3(imageData) {
    localStorage.codeImg3 = imageData;
    imageData='';
    var smallImage3 = document.getElementById('smallImage3');
    smallImage3.style.display = 'block';
    smallImage3.src = "data:image/jpeg;base64," + localStorage.codeImg3;

}






// - FIN js de la toma de fotos

function setGionRutPrestador(){
    if($('#RutPrestador').val()!=''){
        var rutTemp= $('#RutPrestador').val();
        rutTemp = rutTemp.replace('-','');
        var digTemp = rutTemp.substring(rutTemp.length-1, rutTemp.length);
        rutTemp = rutTemp.substring(0,rutTemp.length-1);
        $('#RutPrestador').val(rutTemp+'-'+digTemp);
        
    }
    
}

$(document).ready(function(){
    $.mobile.showPageLoadingMsg();
    $("#tituloReembolso").html(tipoReembolso);
    
    if(tipoReembolso=='Medicamentos.'){
      $("#segundaImagen").css('display','none');  
      //alert('IMPORTANTE: Los reembolsos de medicamentos son sólo con cargo a la cuenta de excedentes. Si el monto de excedentes no es suficiente para realizar el total del valor del reembolso, se reembolsará el saldo vigente de excedentes al momento de procesar la solicitud.');  
      $(".excedentesDiv").css('display','none');
      cantidadDeFotos =1;
      
    }
    if(tipoReembolso=='Consulta Médica.'){
      $("#segundaImagen").css('display','none');  
      cantidadDeFotos =1;
    
    }
      
    getObtenerGrupoFamiliar();
    
    //beneficiario[0].nombre
    $("#beneficiario").change(function() {
        var $selectedOption = $(this).find('option:selected');
        var sel = $selectedOption.val() - 1;
          if($selectedOption.val()>0){
            $("#divPay").css('display','block');  
            //alert(sel);
            beneficiarioSelect = '';
            beneficiarioSelect = beneficiario[sel];
     
            $('#pay option:eq(0)').prop('selected', true);
            $('#pay').selectmenu("refresh");
          }else{
            //$("#divPay").css('display','none');
            $('#pay option:eq(0)').prop('selected', true);
            $('#pay').selectmenu("refresh");

          }
          
          $("#Ncuenta").val('');    
          $(".ocultador").css('display','none');
          $("#telefono").val(beneficiarioSelect.telefono)
          $("#email").val(beneficiarioSelect.email);
          rutBeneficiario = beneficiarioSelect.rut;
          $("#banco").css('display','none');
          $('#banco').css('display', 'none').parent('div').parent('.ui-select').css('display', 'none');
          $('#banco').selectmenu('refresh');
          beneficiarioSelect = '';//
          beneficiarioSelect = beneficiario[idTitularArray];//forzar a los datos del titular
    });

    $("#pay").change(function() {
            var $selectedOption = $(this).find('option:selected');   
                  //alert($selectedOption.val());
            if(($selectedOption.val()=='CTACORRIENTE')||($selectedOption.val()=='CTAVISTA')){
                  $("#banco").css('display','block');
                  $('#banco').css('display', 'block').parent('div').parent('.ui-select').css('display', 'block');
                  $('#banco').selectmenu('refresh');  
                  $("#Ncuenta").css('display','block');    
                  $("#NcuentaTxt").css('display','block'); 
                  $("#Ncuenta").val(beneficiarioSelect.cuentaCorriente);    
                  $(".ocultador").css('display','block');
                  tipoCuentaSeleccionada = $selectedOption.val(); 
                  
                  getInstitucionesBancarias(parseInt(beneficiarioSelect.codBanco));
                  
                  if($selectedOption.val()=='CTACORRIENTE'){
                      formaPagoReembolso = 1;
                  }else{
                      if($selectedOption.html()=='Cuenta Vista o Rut'){
                          formaPagoReembolso = 3;
                      }else{
                          formaPagoReembolso = 4;
                      }
                  }
                  
                  
            }else{
              if($selectedOption.val()=='REEMVISTA'){ //vale vista BBVA
                  $(".ocultador").css('display','none'); 
                  $("#Ncuenta").css('display','none'); 
                  $("#NcuentaTxt").css('display','none'); 
                  $('#banco option:eq(0)').prop('selected', true);
                  $("#banco").css('display','none');
                  $('#banco').css('display', 'none').parent('div').parent('.ui-select').css('display', 'none');
                  $('#banco').selectmenu('refresh');
                  $(".ocultador").css('display','none');
                  tipoCuentaSeleccionada = 'REEMVISTA';
                  if($selectedOption.val()=='REEMVISTA'){
                      formaPagoReembolso = 2;
                  }

              } else{ 
                    $("#Ncuenta").css('display','none');   
                    $("#Ncuenta").val('');    
                    $(".ocultador").css('display','none');
                    $("#banco").css('display','none');
                    $('#banco').css('display', 'none').parent('div').parent('.ui-select').css('display', 'none');
                    $('#banco').selectmenu('refresh');

              }  
            }   

      });
      
    $("#banco").change(function() {
            var $selectedOption = $(this).find('option:selected');     
            idBancoSeleccionado = $selectedOption.val(); 
            nombreBanco = $("#banco option:selected").text();
            $("#Ncuenta").val('');
            
      });
      
    $("#enviarBtn").click(function() {
      
      //VALIDANDO QUE ESTEN TODOS LOS DATOS INGRESADOS
        if((rutBeneficiario!='')&&($("#RutPrestador").val()!='')&&($("#nombrePrestador").val()!='')&&($("#fechaBoleta").val()!='')&&($("#NumeroBoleta").val()!='')&&($("#MontoPrestacion").val()!='')&&($("#telefono").val()!='')&&($("#email").val()!='')&&(tipoCuentaSeleccionada!='')){

            //
             if(cantidadDeFotos==2){
                if(($("#smallImage1").attr("src")!='')&&($("#smallImage2").attr("src")!='')){
                    if (Fn.validaRut($('#RutPrestador').val())) {
                         ValidarDuplicidad();
                    }else{
                         Alert('Rut no valido, tiene que ser en formato xxxxxxxx-x');
                     }
                }else{
                    if($("#smallImage1").attr("src")!=''){
                        Alert('Falta fotografía de la orden médica');
                    }else{
                        Alert('Falta fotografía de la boleta');
                    }

                }
            }else{
                if($("#smallImage1").attr("src")!=''){
                    //alert(Fn.validaRut($('#RutPrestador').val()));
                    if (Fn.validaRut($('#RutPrestador').val())) {
                        codeImg2='';
                        ValidarDuplicidad();
                    }else{
                        Alert('Rut no valido, tiene que ser en formato xxxxxxxx-x');
                    }

               }else{
                   Alert('Falta fotografía de la boleta');
               }
            }    
        }else{

            if(rutBeneficiario==''){
                $("#beneficiario").focus();
                Alert('Seleccione un beneficiario.');
            }else{
                 if($("#nombrePrestador").val()==''){
                     $("#nombrePrestador").focus();
                     Alert('Ingrese el nombre del prestador.');
                 }else{
                     if($("#RutPrestador").val()==''){
                         $("#RutPrestador").focus();
                         Alert('Ingrese el rut del prestador.');
                     }else{
                       if($("#numeroBoleta").val()==''){
                           $("#numeroBoleta").focus();
                           Alert('Ingrese el numero de boleta.');
                       }else{
                           if($("#fechaBoleta").val()==''){
                               
                                navigator.notification.confirm(
                                    'Ingrese la fecha de la boleta.', // message
                                    function(){$("#fechaBoleta").focus();}, 
                                    'Atención!!!', 
                                    'Ok'  
                                );
                               
                           }else{
                                 if($("#MontoPrestacion").val()==''){
                                    $("#MontoPrestacion").focus();
                                    Alert('Ingrese el monto.');
                                 }else{
                                     if($("#telefono").val()==''){
                                         $("#telefono").focus();
                                         Alert('Ingrese el telefono.');
                                     }else{
                                         if($("#email").val()==''){
                                             $("#email").focus();
                                             Alert('Ingrese el email.');
                                         }else{
                                             if(tipoCuentaSeleccionada==''){
                                                 $("#pay").focus();
                                                 Alert('Seleccione la forma de pago.');
                                             }
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
             }

        }
           
            //$("#beneficiario").css("display", "none");
            //$("#pay").css("display", "none");
            //$("#Ncuenta").css("display", "none");
            //$("#Ncuenta").css("display", "none");
      });
 

});


function consulta(){
    
}
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}



function enviar(){
    nombreBanco = $("#banco option:selected").text();
    $(".contenido").css("display", "none");
    $.mobile.showPageLoadingMsg();
    RegistrarReembolsoEnWorkflow( beneficiarioSelect.rut , tipoCuentaSeleccionada,idBancoSeleccionado,$("#Ncuenta").val());

}

function getObtenerGrupoFamiliar(){
    
    $.mobile.showPageLoadingMsg();
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
  <soap:Header>\n\
    <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <User>enlacedesign</User>\n\
      <Token>D543F7F74764AC10CFEEE1DDFE42182D</Token>\n\
      <Ticket>'+ localStorage.getItem('tickets') +'</Ticket>\n\
    </HeaderMobileService>\n\
  </soap:Header>\n\
  <soap:Body>\n\
    <ObtenerGrupoFamiliar xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <Rut>'+rut[0]+'</Rut>\n\
    </ObtenerGrupoFamiliar>\n\
  </soap:Body>\n\
</soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=ObtenerGrupoFamiliar",
        contentType: "text/xml",
        timeout:40000,
        dataType: "xml",
        data: soapRequest,
        success: function (data, status, req){
            if (status == "success"){
                //console.log(req);
                var contador=0;
                var lista='<option value="0">Beneficiario</option>';
                
                //alert(Nac);
                
                $(req.responseXML).find('DatosAfiCargaWfl1')
                    .each(function(){
                        var Nac = $(this).find('FechaNacimiento').text();
                        Nac = setFechaDMA(Nac);
                        Nac = calcularEdad(Nac);
                        
                        if(Nac>=0){    
                            //alert($(this).find('FechaNacimiento').text());
                            if(($(this).find('TipoPers').text() != 'Afiliado')||($(this).find('RutMantisa').text() == rut[0])){
                            
                                lista = lista + '<option value="'+(contador+1)+'">'+$(this).find('NombreCompleto').text()+'</option>';
                            //localStorage.
                            }
                           
                            
                            beneficiario[contador] = new Array();
                            
                            beneficiario[contador] = {
                                rut: $(this).find('RutMantisa').text(),
                                rutDv: $(this).find('RutDv').text(),
                                nombre: $(this).find('NombreCompleto').text(),
                                telefono: $(this).find('FonoParticular').text(),
                                celular: $(this).find('FonoMovil').text(),
                                email: $(this).find('Email').text(),
                                tipo: $(this).find('TipoPers').text(),
                                codBanco: $(this).find('CodInstitucionFinanciera').text(),
                                nomBanco: $(this).find('DescInstitucionFinanciera').text(),
                                cuentaCorriente: $(this).find('NumeroCuentaCorriente').text()
                            };
                            if($(this).find('TipoPers').text() == 'Afiliado'){
                                if((idTitularArray==-1)&&($(this).find('RutMantisa').text() == rut[0])){
                                    idTitularArray = contador;
                                    //alert('el titular logeao es: '+$(this).find('RutMantisa').text());
                                }
                            }
                            
                           contador++;
                       
                        }//getEdad();
                        
                        
                    });
                 
                getExcedentes();
                if(contador>0){
                    $('#beneficiario').append(lista);
                    $('#beneficiario').selectmenu("refresh");
                    //(alert(lista);
                    $.mobile.hidePageLoadingMsg(); 
                    if(tipoReembolso=='Medicamentos.'){
                        Alert('IMPORTANTE: Los reembolsos de medicamentos son sólo con cargo a la cuenta de excedentes. Si el monto de excedentes no es suficiente para realizar el total del valor del reembolso, se reembolsará el saldo vigente de excedentes al momento de procesar la solicitud.');   
                    }
                    
                }else{
                    $.mobile.hidePageLoadingMsg(); 
                    Alert('El servicio no responde. Por favor, verifique su conexión.');
                }
            }

        },
        error: function(){
                    navigator.notification.alert(
                        'No se pudo obtener los beneficiarios. Por favor, verifique su conexión.',  // message
                        function(){getObtenerGrupoFamiliar();},         // callback
                        'Atención!!!',            // title
                        'Ok'                  // buttonName
                    );
                }
    });
    return false;
};
function getObtenerCargasAfiliado(){
    
    $.mobile.showPageLoadingMsg();
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?>\n\
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
  <soap:Header>\n\
    <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <User>enlacedesign</User>\n\
      <Token>17D07214D97C2C92D4725DFF2BB52A77</Token>\n\
      <Ticket>'+ localStorage.getItem('tickets') +'</Ticket>\n\
    </HeaderMobileService>\n\
  </soap:Header>\n\
  <soap:Body>\n\
    <ObtenerCargasAfiliado xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <Rut>'+rut[0]+'</Rut>\n\
    </ObtenerCargasAfiliado>\n\
  </soap:Body>\n\
</soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=ObtenerCargasAfiliado",
        contentType: "text/xml",
        timeout:40000,
        dataType: "xml",
        data: soapRequest,
        success: function (data, status, req){
            if (status == "success"){
                //console.log(req);
                var contador=0;
                var lista='<option value="0">Beneficiario</option>';
                
                //alert(Nac);
                
                $(req.responseXML).find('DatosAfiliadoCarga')
                    .each(function(){
                        var Nac = $(this).find('FechaNacimiento').text();
                        Nac = setFechaDMA(Nac);
                        Nac = calcularEdad(Nac);
                        
                        if(Nac>=0){    
                            //alert($(this).find('FechaNacimiento').text());
                            lista = lista + '<option value="'+(contador+1)+'">'+$(this).find('Nombre').text()+' '+$(this).find('ApellidoPaterno').text()+'</option>';
                            //localStorage.
                            var rutSepa = separaRut($(this).find('Rut').text());
                           
                            beneficiario[contador] = new Array();
                            beneficiario[contador] = {
                                rut: rutSepa[0],
                                rutDv: rutSepa[1],
                                nombre: $(this).find('Nombre').text()+' '+$(this).find('ApellidoPaterno').text()+' '+$(this).find('ApellidoMaterno').text(),
                                telefono: $(this).find('FonoParticular').text(),
                                celular: $(this).find('FonoMovil').text(),
                                email: $(this).find('Email').text(),
                                tipo: $(this).find('TipoPers').text(),
                                codBanco: $(this).find('CodInstitucionFinanciera').text(),
                                nomBanco: $(this).find('DescInstitucionFinanciera').text(),
                                cuentaCorriente: $(this).find('NumeroCuentaCorriente').text()
                            };
                            if($(this).find('TipoPers').text() == 'Afiliado'){
                                if((idTitularArray==-1)&&($(this).find('RutMantisa').text() == rut[0])){
                                    idTitularArray = contador;
                                    //alert('el titular logeao es: '+$(this).find('RutMantisa').text());
                                }
                            }
                           contador++;
                           
                        }//getEdad();
                        
                        
                    });
                 
                getExcedentes();
                if(contador>0){
                    $('#beneficiario').append(lista);
                    $('#beneficiario').selectmenu("refresh");
                    //(alert(lista);
                    $.mobile.hidePageLoadingMsg(); 
                    if(tipoReembolso=='Medicamentos.'){
                        Alert('IMPORTANTE: Los reembolsos de medicamentos son sólo con cargo a la cuenta de excedentes. Si el monto de excedentes no es suficiente para realizar el total del valor del reembolso, se reembolsará el saldo vigente de excedentes al momento de procesar la solicitud.');   
                    }
                    
                }else{
                    $.mobile.hidePageLoadingMsg(); 
                    Alert('El servicio no responde. Por favor, verifique su conexión.');
                }
            }

        },
        error: function(){
                    navigator.notification.alert(
                        'No se pudo obtener los beneficiarios. Por favor, verifique su conexión.',  // message
                        function(){getObtenerGrupoFamiliar();},         // callback
                        'Atención!!!',            // title
                        'Ok'                  // buttonName
                    );
                }
    });
    return false;
};

function getExcedentes(){
    $.mobile.showPageLoadingMsg();
        //alert(rutDeposito +' - '+tipoCuenta+' - '+BancoDeposito+' - '+NumeroCuenta);
        var soapRequest =
        '<?xml version="1.0" encoding="utf-8"?> \n\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
          <soap:Header>\n\
            <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
              <User>enlacedesign</User>\n\
              <Token>30DD5A572AB0B441BCFFA208E48081C1</Token>\n\
              <Ticket>'+ localStorage.getItem('tickets') +'</Ticket>\n\
            </HeaderMobileService>\n\
          </soap:Header>\n\
          <soap:Body>\n\
            <ObtenerSaldoExcedente xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
              <rut>'+rut[0]+'</rut>\n\
            </ObtenerSaldoExcedente>\n\
          </soap:Body>\n\
        </soap:Envelope>';
        $.ajax({
            type: "POST",
            url: urlMobile+"?op=ObtenerSaldoExcedente",
            contentType: "text/xml",
            timeout:20000,
            dataType: "xml",
            data: soapRequest,
            success: function (data, status, req){
                //alert(status);
                if (status == "success"){
                    //alert( $(req.responseXML).find('Data').text() );idReembolso
                    var excedent = $(req.responseXML).find('ObtenerSaldoExcedenteResult').text();
                    if( excedent != ''){
                       
                        $('#excedeText').html('Tienes '+$(req.responseXML).find('ObtenerSaldoExcedenteResult').text()+' de excedentes.');
                    }
                    $.mobile.hidePageLoadingMsg();
                }

            },
            error: function(){
                        navigator.notification.alert(
                            'No se pudo obtener los excedentes. Por favor, verifique su conexión.',  // message
                            function(){getExcedentes();},         // callback
                            'Atención!!!',            // title
                            'Ok'                  // buttonName
                        );
                    }
        });
        return false;
   
};

function getInstitucionesBancarias(selecto){
    $.mobile.showPageLoadingMsg();
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
  <soap:Header> \n\
    <HeaderDMZService xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
      <User>enlacedesign</User> \n\
      <Token>918A51928281A1A4DC4C9965A9FE56A1</Token> \n\
    </HeaderDMZService> \n\
  </soap:Header> \n\
  <soap:Body> \n\
    <InstitucionesBancarias xmlns="Consalud.DMZWebCliente.DMZ.Servicios" /> \n\
  </soap:Body> \n\
</soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=InstitucionesBancarias",
        contentType: "text/xml",
        dataType: "xml",
        timeout:20000,
        data: soapRequest,
        success: function (data, status, req){
            if (status == "success"){
                //console.log(req);
                var contador=0;
                var lista='<option value="0">Banco</option>';
                
                //alert(Nac);
                
                $(req.responseXML).find('BancoTesoreria1')
                    .each(function(){
                            var nombreBanco = $(this).find('Sdescorinstfinanc').text();
                            var idBanco = parseInt($(this).find('NidCodinstfinanc').text());
                            
                            //alert(selecto+" == "+idBanco);
                            if(selecto == idBanco){
                                idBancoSeleccionado = idBanco;
                                lista = lista + '<option value="'+idBanco+'" selected >'+nombreBanco+'</option>';
                            }else{
                                lista = lista + '<option value="'+idBanco+'">'+nombreBanco+'</option>';
                            }
                        
                        
                    });
                 $('#banco').html(lista); 
                 $('#banco').selectmenu('refresh'); 
                 $.mobile.hidePageLoadingMsg(); 
                
            }

        },
        error: function(){
                    navigator.notification.alert(
                        'No se pudo obtener las instituciones bancarias. Por favor, verifique su conexión.',  // message
                        function(){getInstitucionesBancarias(selecto);},         // callback
                        'Atención!!!',            // title
                        'Ok'                  // buttonName
                    );
                }

    });
    return false;
};

function updateCuentaCorriente(){
    if($("#Ncuenta").val() != ''){
        $.mobile.showPageLoadingMsg();
        var soapRequest =
        '<?xml version="1.0" encoding="utf-8"?> \n\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
        <soap:Header> \n\
          <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
            <User>enlacedesign</User> \n\
            <Token>4511CCA743BEEF1EB7FFBDDD1C898072</Token> \n\
            <Ticket>AFEEA777CC9194F1D16D0C0023F71ABC24B2403B88AB80F02C09456C5BBB2D0A256F6DAA64AF5443</Ticket> \n\
          </HeaderMobileService> \n\
        </soap:Header> \n\
        <soap:Body> \n\
          <RegistrarCuentaCorriente xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
            <Rut>'+rut[0]+'</Rut> \n\
            <RutCuenta>'+beneficiarioSelect.rut+'</RutCuenta> \n\
            <TipoCuenta>'+tipoCuentaSeleccionada+'</TipoCuenta> \n\
            <CodInstFinanc>'+idBancoSeleccionado+'</CodInstFinanc> \n\
            <NumeroCuenta>'+parseInt($("#Ncuenta").val())+'</NumeroCuenta> \n\
          </RegistrarCuentaCorriente> \n\
        </soap:Body> \n\
      </soap:Envelope>';
        $.ajax({
            type: "POST",
            url: urlMobile+"?op=RegistrarCuentaCorriente",
            contentType: "text/xml",
            dataType: "xml",
            timeout:20000,
            data: soapRequest,
            success: function (data, status, req){
                //alert(status);
                if (status == "success"){
                    if( $(req.responseXML).find('Data').text() == 'true'){                    
                        //alert('se actualiza el registro');
                        window.location = 'menu.html'; 
                    }else{
                        window.location = 'menu.html'; 
                    }
                    $.mobile.hidePageLoadingMsg();
                }

            },
            error: function(){
                window.location = 'menu.html'; 
            }
        });
        return false;
    }else{
        localStorage.codeImg1='';
        localStorage.codeImg2='';
        window.location = 'menu.html'; 
        $.mobile.hidePageLoadingMsg();
        $(".contenido").css("display", "block");
    }
};

function ValidarDuplicidad(){
        $.mobile.showPageLoadingMsg();
        var rutPrestador = separaRut($('#RutPrestador').val());
        var soapRequest =
        '<?xml version="1.0" encoding="utf-8"?> \n\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
        <soap:Header>\n\
          <HeaderDMZService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
            <User>enlacedesign</User>\n\
            <Token>8CC7E531E841176D7B236C5615CEFF15</Token>\n\
          </HeaderDMZService>\n\
        </soap:Header>\n\
        <soap:Body>\n\
          <ValidarDuplicidad xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
            <numeroBoleta>'+$('#numeroBoleta').val()+'</numeroBoleta>\n\
            <rutPrestador>'+rutPrestador[0]+'</rutPrestador>\n\
            <dvPrestador>'+rutPrestador[1]+'</dvPrestador>\n\
          </ValidarDuplicidad>\n\
        </soap:Body>\n\
        </soap:Envelope>';
        $.ajax({
            type: "POST",
            url: urlMobile+"?op=ValidarDuplicidad",
            contentType: "text/xml",
            dataType: "xml",
            timeout:8000,
            data: soapRequest,
            success: function (data, status, req){
                //alert(status);
                if (status == "success"){
                    //alert( $(req.responseXML).find('Data').text() );
                    estado = $(req.responseXML).find('Data').text();
                    if( estado == 'false'){
                        //alert('no existe boleta');
                        enviar();

                    }else{
                        if( estado == 'true'){
                            if($(req.responseXML).find('ErrorMessage').text() == "Ha ocurrido un problema al ingresar el reembolso. Por favor, verifique su conexión."){
                                Alert('Ingrese un RUT de un prestador válido e intente nuevamente');
                            }else{
                                console.log(req.responseXML);
                                Alert($(req.responseXML).find('ErrorMessage').text());
                            }
                            $.mobile.hidePageLoadingMsg();
                            $(".contenido").css("display", "block");
                        }else{
                            Alert('Por favor, verifique su conexión a red de datos.');
                            $.mobile.hidePageLoadingMsg();
                            $(".contenido").css("display", "block");
                        }
                    
                    }
                }

            },
            error: function(){
                        navigator.notification.alert(
                            'No se pudo validar la boleta. Por favor, verifique su conexión.',  // message
                            function(){ValidarDuplicidad();},         // callback
                            'Atención!!!',            // title
                            'Ok'                  // buttonName
                        );
                    }
        });
        return false;
   
};

function RegistrarReembolsoEnWorkflow(rutDeposito, tipoCuenta, BancoDeposito, NumeroCuenta ){
    //$.mobile.showPageLoadingMsg();
    //$(".contenido").css("display", "none");
    var excede = 'n';
    if($('#excedentes:checked').val()){
        excede = 's';
    }
    var fechaIngreso = $('#fechaBoleta').val();
    var fechaTemp = fechaIngreso.split('-');
    if(fechaTemp[2].length >= 3){
        fechaIngreso = fechaTemp[2]+'-'+fechaTemp[1]+'-'+fechaTemp[0];
    }
        //alert(rutDeposito +' - '+tipoCuenta+' - '+BancoDeposito+' - '+NumeroCuenta);
        var rutPrestador = separaRut($('#RutPrestador').val());
        var soapRequest =
        '<?xml version="1.0" encoding="utf-8"?> \n\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
        <soap:Header> \n\
          <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
            <User>enlacedesign</User> \n\
            <Token>F14C036ABB90094BF39F61725A129991</Token> \n\
            <Ticket>'+ localStorage.getItem('tickets') +'</Ticket> \n\
          </HeaderMobileService> \n\
        </soap:Header> \n\
        <soap:Body> \n\
          <RegistrarReembolsoEnWorkflow xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
            <Rut>'+rutDeposito+'</Rut> \n\
            <TipoCuenta>'+tipoCuenta+'</TipoCuenta> \n\
            <BancoDeposito>'+BancoDeposito+'</BancoDeposito> \n\
            <NumeroCuenta>'+NumeroCuenta+'</NumeroCuenta> \n\
            <FlagExcedente>'+excede+'</FlagExcedente> \n\
            <CantidadBoleta>1</CantidadBoleta> \n\
            <CantidadInformeMedico>0</CantidadInformeMedico> \n\
            <CantidadOrdenMedica>1</CantidadOrdenMedica> \n\
            <NumeroBoleta>'+$('#numeroBoleta').val()+'</NumeroBoleta>\n\
            <FechaBoleta>'+fechaIngreso+'</FechaBoleta>\n\
            <RutPrestador>'+rutPrestador[0]+'</RutPrestador>\n\
            <DigitoPrestador>'+rutPrestador[1]+'</DigitoPrestador>\n\
            <NombrePrestador>'+$('#nombrePrestador').val()+'</NombrePrestador>\n\
          </RegistrarReembolsoEnWorkflow> \n\
        </soap:Body> \n\
      </soap:Envelope>';
        $.ajax({
            type: "POST",
            url: urlMobile+"?op=RegistrarReembolsoEnWorkflow",
            contentType: "text/xml",
            dataType: "xml",
            timeout:50000,
            data: soapRequest,
            success: function (data, status, req){
                //alert(status);
                if (status == "success"){
                    //alert( $(req.responseXML).find('Data').text() );
                    idReembolso = $(req.responseXML).find('Data').text();
                    if( idReembolso != ''){
                        //alert('se registra el reembolso con el id= '+idReembolso);
                        //window.location = 'menu.html'; 
                        //aqui se tiene que subir la imagen ahora
                        //$.mobile.showPageLoadingMsg();
                        SubirImagen(idReembolso);

                    }else{
                        Alert('Verifique su conexión e inténtelo nuevamente');
                        $.mobile.hidePageLoadingMsg();
                        $(".contenido").css("display", "block");
                    }
                }

            },
            error: function(){
                        navigator.notification.alert(
                            'No se pudo registrar el reembolso. Por favor, verifique su conexión.',  // message
                            function(){RegistrarReembolsoEnWorkflow(rutDeposito, tipoCuenta, BancoDeposito, NumeroCuenta );},         // callback
                            'Atención!!!',            // title
                            'Ok'                  // buttonName
                        );
                    }
        });
        return false;
   
};

function SubirImagen(idReembolso){
    //alert('comienza a subir imagen');
    $.mobile.showPageLoadingMsg();
    var excede = false;
    if($('#excedentes:checked').val()){
        excede = true;
    }
    
    var montoPrestacion = $('#MontoPrestacion').val();
    montoPrestacion = montoPrestacion.replace(".",'');
    montoPrestacion = montoPrestacion.replace(",",'');
    montoPrestacion = montoPrestacion.replace("'",'');
    montoPrestacion = montoPrestacion.replace("-",'');
    var boletaPrestacion = $('#numeroBoleta').val();
    boletaPrestacion = boletaPrestacion.replace(".",'');
    boletaPrestacion = boletaPrestacion.replace(",",'');
    boletaPrestacion = boletaPrestacion.replace("'",'');
    boletaPrestacion = boletaPrestacion.replace("-",'');
    var Ncuenta = $('#Ncuenta').val();
    Ncuenta = Ncuenta.replace(".",'');
    Ncuenta = Ncuenta.replace(",",'');
    Ncuenta = Ncuenta.replace("'",'');
    Ncuenta = Ncuenta.replace("-",'');
    
    var telefono = $('#telefono').val();
    telefono = telefono.replace(".",'');
    telefono = telefono.replace(",",'');
    telefono = telefono.replace("'",'');
    telefono = telefono.replace("-",'');
    
    var Ncuenta = $('#Ncuenta').val();
    Ncuenta = Ncuenta.replace(".",'');
    Ncuenta = Ncuenta.replace(",",'');
    Ncuenta = Ncuenta.replace("'",'');
    Ncuenta = Ncuenta.replace("-",'');
    
    var rutPrestador = separaRut($('#RutPrestador').val());
    
    var comentarioTxt = $('#comentario').val();
    
    comentarioTxt = comentarioTxt.replace(",",'');
     // RutPrestador tiene que ser valido. numerico  60910000-1
    // NumeroBoleta tiene que ser numerico
    // telefono tiene que ser numerico
    // Ncuenta solo numeros
    //Los comentrarios no tienen que contener " , " cambiar por puntos o simple mente sacarlas.
    //var aux = ' id Reembolso: '+idReembolso+' | nombre Titular: '+beneficiarioSelect.nombre+' | Rut Titular: '+rut[0]+' | rutBeneficiario: '+rutBeneficiario+' | rutPrestador: '+rutPrestador[0]+' | boletaPrestacion: '+boletaPrestacion+' | tipoReembolso: '+tipoReembolso+' | montoPrestacion: '+montoPrestacion+' | telefono: '+telefono+' | email: '+$('#email').val()+' | Excedente: '+excede+' | formaDePago: '+formaPagoReembolso+' | cuenta: '+Ncuenta+' | banco: '+nombreBanco+' | comentario: '+comentarioTxt;
   
    var nombreAux=codificarUtf8(beneficiarioSelect.nombre);
    var comentarioAux=codificarUtf8(comentarioTxt);
    var tipoReembolsoAux = codificarUtf8(tipoReembolso);
    
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
  <soap:Header>\n\
    <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <User>enlacedesign</User>\n\
      <Token>C51360D1DF43C683C485FF198791D226</Token>\n\
      <Ticket>'+ localStorage.getItem('tickets') +'</Ticket>\n\
    </HeaderMobileService>\n\
  </soap:Header>\n\
  <soap:Body>\n\
    <SubirImagen xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <rut>'+rut[0]+'</rut>\n\
      <imgBoletaBase64>'+localStorage.codeImg1+'</imgBoletaBase64>\n\
      <nombreArchivoBoleta>'+rut[0]+'1.jpg</nombreArchivoBoleta>\n\
      <imgOrdenMedicaBase64>'+localStorage.codeImg2+'</imgOrdenMedicaBase64>\n\
      <nombreArchivoOrdenMedica>'+rut[0]+'2.jpg</nombreArchivoOrdenMedica>\n\
      <imgArchivoAdicionalBase64>'+localStorage.codeImg3+'</imgArchivoAdicionalBase64>\n\
      <nombreArchivoAdicional>'+rut[0]+'3.jpg</nombreArchivoAdicional>\n\
      <numeroSobre>'+idReembolso+'</numeroSobre>\n\
      <nombreTitular>'+nombreAux+'</nombreTitular>\n\
      <rutTitular>'+rut[0]+'</rutTitular>\n\
      <rutBeneficiario>'+rutBeneficiario+'</rutBeneficiario>\n\
      <rutPrestador>'+rutPrestador[0]+'</rutPrestador>\n\
      <numeroBoleta>'+boletaPrestacion+'</numeroBoleta>\n\
      <tipoReembolso>'+tipoReembolsoAux+'</tipoReembolso>\n\
      <valorReembolso>'+montoPrestacion+'</valorReembolso>\n\
      <numeroCelular>'+telefono+'</numeroCelular>\n\
      <email>'+$('#email').val()+'</email>\n\
      <bonificacionExcedentes>'+excede+'</bonificacionExcedentes>\n\
      <formaPagoReembolso>'+formaPagoReembolso+'</formaPagoReembolso>\n\
      <cuentaBancaria>'+Ncuenta+'</cuentaBancaria>\n\
      <banco>'+nombreBanco+'</banco>\n\
      <comentario>'+comentarioAux+'</comentario>\n\
    </SubirImagen>\n\
  </soap:Body>\n\
</soap:Envelope>\n\
';
    
    //iniciaDebug(soapRequest,'fotos');
    console.log(urlMobile+"?op=SubirImagen");
    console.log(soapRequest);
    
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=SubirImagen",
        contentType: "text/xml",
        dataType: "xml",
        timeout:1000*60*5,
        data: soapRequest,
        success: function (data, status, req){
            //alert(status);
            //$.mobile.showPageLoadingMsg();
            if (status == "success"){
                
                //alert( $(req.responseXML).find('Data').text() );
                if( $(req.responseXML).find('Data').text() == 'true'){
                    $.mobile.hidePageLoadingMsg();
                    Alert('Reembolso realizado correctamente.');
                    $(".contenido").css("display", "block");
                    if((beneficiarioSelect.cuentaCorriente != $("#Ncuenta").val()) || (beneficiarioSelect.codBanco != idBancoSeleccionado) && ($("#Ncuenta").val()!='') ){
                        updateCuentaCorriente();   
                        
                    }else{
                        localStorage.codeImg1='';
                        localStorage.codeImg2='';
                        window.location = 'menu.html'; 
                        $.mobile.hidePageLoadingMsg();
                        $(".contenido").css("display", "block");
                    }
                    
                }else{
                    console.log(status);
                    console.log(data);
                    console.log(req);

                    Alert('No se pudo subir las imágenes. Por favor, verifique su conexión.');
                    $.mobile.hidePageLoadingMsg();
                    $(".contenido").css("display", "block");
                }
            }

        },
        error: function(){
                        window.location = 'menu_reembolso.html';
                    }
    });
    return false;
};






