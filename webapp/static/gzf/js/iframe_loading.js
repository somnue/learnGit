/**
 * @author TianHan
 */
$(function(){  
      //loadingЧ��  Ĭ����body�м��ظ�Ч��
      $('body').css('height', $(window).height());    
      jQuery('body').showLoading( { 
				    'afterShow': 
					function() {
						setTimeout( "jQuery('body').hideLoading()", 3000); 
					} 	
				 }
			)
    });