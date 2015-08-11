function irApaginaConBackBtn(){
    window.location = 'menu.html';
}
rut = separaRut(localStorage.getItem('usuario'));

function getSolicitudes(){
    $.mobile.showPageLoadingMsg();
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
  <soap:Header>\n\
    <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <User>enlacedesign</User>\n\
      <Token>483A25F782229DA98C41F6400C73E56C</Token>\n\
      <Ticket>'+ localStorage.getItem('tickets') +'</Ticket>\n\
    </HeaderMobileService>\n\
  </soap:Header>\n\
  <soap:Body>\n\
    <ObtenerReembSolicitados xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
      <Rut>'+rut[0]+'</Rut>\n\
    </ObtenerReembSolicitados>\n\
  </soap:Body>\n\
</soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=ObtenerReembSolicitados",
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: function (data, status, req){
            if (status == "success"){
                //console.log(req);
                var contador=0;
                var lista='';
                
                $(req.responseXML).find('WflPortalExt')
                    .each(function(){
                        if( 'Aceptada Pago' != $(this).find('EstadoSobreDesc').text() ){
                        lista = lista + '<li > \n\
                                            <h3>'+$(this).find('NombrePrestador').text()+'</h3>\n\
                                            <p>'+$(this).find('NombrePrestador').text()+'</p> \n\
                                            <p>Fecha recepción: <strong>'+setFechaDMA($(this).find('FechaRecepcionBuzon').text())+'</strong> </p> \n\
                                            <p>Sobre: <strong>'+$(this).find('NumeroSobre').text()+'</strong></p> \n\
                                            <p>Fecha tentativa de reembolso: <strong>'+setFechaDMA($(this).find('FechaTentativaReembolso').text())+'</strong> </p> \n\
                                            <p>Nº Boleta: <strong>'+$(this).find('NumeroBoleta').text()+'</strong></p> \n\
                                            <p>Folio: <strong>'+$(this).find('Folio').text()+'</strong></p> \n\
                                            <p class="ui-li-aside">Estado: <strong>'+$(this).find('EstadoSobreDesc').text()+'</strong></p> \n\
                              </li>';
                            contador++;
                        };     
                        //alert(lista);
                        
                    });
                    lista = '<li data-role="list-divider">'+localStorage.getItem('usuario')+'<span class="ui-li-count">'+contador+'</span></li>'+lista;    
                if(contador>0){
                    $('#solicitudes').append(lista);
                    $('#solicitudes').listview('refresh');
                    //(alert(lista);
                    $.mobile.hidePageLoadingMsg(); 
                }else{
                    $.mobile.hidePageLoadingMsg(); 
                    //Alert('No hay Solicitudes ');
                }
            }

        },
        error: processError
    });
    return false;
};


function getReembolsos(){
    $.mobile.showPageLoadingMsg();
    var soapRequest =
    '<?xml version="1.0" encoding="utf-8"?> \n\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\
      <soap:Header>\n\
        <HeaderMobileService xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
          <User>enlacedesign</User>\n\
          <Token>483A25F782229DA966C1CBE48CA8D538</Token>\n\
          <Ticket>'+ localStorage.getItem('tickets') +'</Ticket>\n\
        </HeaderMobileService>\n\
      </soap:Header>\n\
      <soap:Body>\n\
        <ObtenerReembRealizados xmlns="Consalud.DMZWebCliente.DMZ.Servicios">\n\
          <Rut>'+rut[0]+'</Rut>\n\
        </ObtenerReembRealizados>\n\
      </soap:Body>\n\
    </soap:Envelope>';
    $.ajax({
        type: "POST",
        url: urlMobile+"?op=ObtenerReembRealizados",
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: function (data, status, req){
            if (status == "success"){
                //console.log(req);
                var contador2=0;
                var lista='';
                
                $(req.responseXML).find('ClieObtReembolsos')
                    .each(function(){
                        
                        lista = lista + '<li> \n\
                                        <h3>'+$(this).find('NombreProfesional').text()+'</h3> \n\
                                        <p>'+$(this).find('NombreProfesional').text()+'</p> \n\
                                        <p>Fecha Reembolso: <strong>'+$(this).find('FechaReembolso').text()+'</strong> </p> \n\
                                        <p>Fecha Pago: <strong>'+$(this).find('FechaPago').text()+'</strong></p> \n\
                                        <p>Forma de Pago: <strong>'+$(this).find('FormaPagoReembolso').text()+'</strong></p> \n\
                                        <p>Monto: <strong>$ '+$(this).find('MontoReembolso').text()+'</strong></p> \n\
                                        <p>Nº Boleta: <strong>'+$(this).find('FolioDocumento').text()+'</strong></p> \n\
                                        <p>Folio: <strong>'+$(this).find('FolioReembolso').text()+'</strong></p> \n\
                                        <p class="ui-li-aside">Estado: <strong>'+$(this).find('Estado').text()+'</strong></p> \n\
                              </li>';
                              
                        //alert(lista);
                        contador2++;
                    });
                    lista = '<li data-role="list-divider">'+localStorage.getItem('usuario')+'<span class="ui-li-count">'+contador2+'</span></li>'+lista;    
                if(contador2>0){
                    $('#realizados').append(lista);
                    $('#realizados').listview('refresh');
                    //(alert(lista);
                    $.mobile.hidePageLoadingMsg(); 
                }else{
                    $.mobile.hidePageLoadingMsg(); 
                    //Alert('No hay reembolsos ');
                }
            }

        },
        error: processError
    });
    return false;
};

function downloadPDFFile(urlTemp) {
    var fileDownloadPDF = new FileTransfer();
    var uri = encodeURI(urlTemp);
    fileDownloadPDF.download(
        uri,
        pathToRoot + '/reportepdf.pdf',
        function(entry) {
            alert("download complete: " + entry.fullPath);
            alert("File Downloaded. Click 'Read Editable Downloaded File' to see text");
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        }
    );
}