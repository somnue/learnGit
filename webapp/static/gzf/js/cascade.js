/**
 * @author TianHan
 */
//�����ĳ�ʼ��
$(function(){  
	// ����
	 $("#back_id").bankSelect({
		  bankId:"bank",   //������
		  provId:"prov",   //������
		  cityId:"city",   //������
		  prov:"�ַ�����",
		  nodata:"none"
	  });  
  	
	// //ҵ������
 
	  $("#select_id").bankSelect({
		url:{"banklist":[
		{"b":"ǰ�˼���","p":[{"n":"HTML"},{"n":"CSS","a":[{"s":"CSS2.0"},{"s":"CSS3.0"}]},{"n":"JAVASCIPT"}]},"�������","p":[{"n":"C"},{"n":"C++"},{"n":"Objective-C"},{"n":"PHP"},{"n":"JAVA"}]},":[{"n":"Mysql"},{"n":"SqlServer"},{"n":"Oracle"},{"n":"DB2"}]},
	  ]},
	    bankId:"bigselect",   //������
		provId:"smallselect",   //������ 
		prov:"�ַ�����",
		nodata:"none"
   }); 
})
