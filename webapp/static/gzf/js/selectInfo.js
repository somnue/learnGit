/**
 * @author TianHan
 */
  
$(function(){ 
     //select�������ӽ�����ת
      $("#selectContainer").live("change", function() {  
        var _Id = $(this).find("option:selected").attr("id");
        var _aciton=_Id+".html";   
        if(_Id!='pleaseDo'){  
             $('form:first').attr("action",_aciton);  
        }else{
             $('form:first').attr("action",""); 
        }  
    });   
    
    
    
    //���ݱ���������ת
})
