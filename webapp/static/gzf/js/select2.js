/**
 * @author TianHan
 */
$(function() {  
   
    //select�е����ļ���
   $("#bigSelect").live("change", function() { 
        var _bigoptionId = $(this).find("option:selected").attr("id");
        if (_bigoptionId == 'bigSelected') {
            $("#smallSelect").show();
        }else{
            $("#smallSelect").hide()
        }
    });   
})
