function irApaginaConBackBtn(){
    if($("#acceptaTerminosSubmit").hasClass('existe')){
        window.location = 'menu.html';
    }
}
var term = new Array();
var terminos = new Array();

$(document).ready(function() {
   $("#acceptaTerminos").click(function() {
        if ($("#acceptaTerminos").is(':checked')) {
            //$("#acceptaTerminosSubmit").css('display', 'inline');
            $("#acceptaTerminosSubmit").removeClass('terminos_off');
            $("#acceptaTerminosSubmit").addClass('terminos_on');
            $(".checkTerminos").removeClass('terminos_off');
            $(".checkTerminos").addClass('terminos_on');
            
        } else {
            $("#acceptaTerminosSubmit").addClass('terminos_off');
            $("#acceptaTerminosSubmit").removeClass('terminos_on');
            $(".checkTerminos").addClass('terminos_off');
            $(".checkTerminos").removeClass('terminos_on');
            
        }

    });
    $("#acceptaTerminosSubmit").click(function() {
        if($("#acceptaTerminosSubmit").hasClass('terminos_on')){
            if (localStorage.terminos) {
                term = localStorage.terminos + ',' + localStorage.usuario;
                localStorage.terminos = term;
            } else {
                localStorage.terminos = localStorage.usuario;
            }
            window.location = 'menu.html';
        }     
    });
    
});   
    
    
function getTerminos(){
    $.mobile.showPageLoadingMsg();
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \n\
    <soap:Header> \n\
      <HeaderDMZService xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
        <User>enlacedesign</User> \n\
        <Token>7545168A9EDDCD65949DD66F87579C5A</Token> \n\
      </HeaderDMZService> \n\
    </soap:Header> \n\
    <soap:Body> \n\
      <BuscarPlantillaMensajeria xmlns="Consalud.DMZWebCliente.DMZ.Servicios"> \n\
        <Plantilla>2000288</Plantilla> \n\
        <Secuencia>0</Secuencia> \n\
      </BuscarPlantillaMensajeria> \n\
    </soap:Body> \n\
    </soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=BuscarPlantillaMensajeria",
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: function (data, status, req){
                    if (status == "success"){
                        //console.log(req);
                        var resultado='';
                        $(req.responseXML).find('BuscarPlantillaMensajeriaResult')
                            .each(function(){
                                resultado = $(this).find('Contenido').text();
                            });

                        if(resultado!=''){
                            
                            $('#terminosycondi').html(resultado);
                            $.mobile.hidePageLoadingMsg(); 
                              if(!localStorage.terminos){
                                    $(".checkTerminos").css('display','inline');
                                    $("#acceptaTerminosSubmit").css('display', 'inline');
                                    $(".checkTerminosHome").css('display', 'none');
                                } else {    
                                    term = localStorage.getItem('terminos') ;
                                    terminos = term.split(",");
                                    var rutCompleto = localStorage.usuario;
                                    //Alert(terminos.indexOf(rut));
                                    if (terminos.indexOf(rutCompleto) != -1) { 
                                        $(".checkTerminos").css('display','none');
                                        $(".checkTerminosHome").css('display', 'inline');
                                        $("#acceptaTerminosSubmit").addClass('existe');
                                    }else{
                                        $(".checkTerminos").css('display','inline');
                                        $("#acceptaTerminosSubmit").css('display', 'inline');
                                        $(".checkTerminosHome").css('display', 'none');
                                    }
                                    $.mobile.hidePageLoadingMsg(); 
                                }
                        }else{
                            $.mobile.hidePageLoadingMsg(); 
                            Alert('Verifique su conexión e inténtelo nuevamente');
                        }
                    }
                    

    },
        error: processError
    });
    return false;
};
