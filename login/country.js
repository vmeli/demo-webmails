var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Augusto", "Septiembre", "Octobre", "Noviembre", "Diciembre" ];

    $('#years').append($('<option />').val(0).html("Año"));
for (i = new Date().getFullYear(); i > 1900; i--){
    $('#years').append($('<option />').val(i).html(i));
    console.log(i);
}
    
for (i = 0; i < 13; i++){
    if ( i==0){
        $('#months').append($('<option />').val(i).html("Mes"));
    } else {
        $('#months').append($('<option />').val(i).html(monthNames[i-1]));        
    }
}

updateNumberOfDays(); 
    
// $('#years, #months').on("change", function(){
//     updateNumberOfDays(); 
// });

function updateNumberOfDays(){
    $('#days').html('');
    month=$('#months').val();
    year=$('#years').val();
    days=daysInMonth(month, year);

    $('#days').append($('<option />').val(0).html("Día"));
    for(i=1; i < days+1 ; i++){
            $('#days').append($('<option />').val(i).html(i));
    }
    // $('#message').html(monthNames[month-1]+" in the year "+year+" has <b>"+days+"</b> days");
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}