/**
 * @author TianHan
 */
   $(function(){   
       //��ť���ɫ������ʾloadingЧ��
      $("#commonButton").live("click",function(){ 
          $(this).addClass("button_bg3_gray");   
          jQuery('body').showLoading( { 
                    'afterShow': 
                    function() {
                        setTimeout("jQuery('body').hideLoading()", 1500); 
                        //tr�����Ĭ�ϼ�һ��tbody 
                        setTimeout('$("#commonButton").parent("td").parent("tr").parent("tbody").parent("table").parent("form").submit();',1505);
                    }   
                 }
            )  
      }) 
  });  