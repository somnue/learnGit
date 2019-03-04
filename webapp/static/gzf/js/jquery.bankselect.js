/*
Ajax ����ʡ������
http://code.ciaoca.cn/
���ڣ�2012-7-18

settings ����˵��
-----
url:ʡ������josn�ļ�·��
prov:Ĭ��ʡ��
city:Ĭ�ϳ���
dist:Ĭ�ϵ������أ�
nodata:������״̬
required:��ѡ��
------------------------------ */
(function($){
	$.fn.bankSelect=function(settings){ 
		if(this.length<1){return;}; 
		// Ĭ��ֵ
		settings=$.extend({
			url:"../js/bank.js",
			bank:null,
			prov:null,
			city:null, 
			nodata:null,
			required:true 
		},settings);
 
		var box_obj=$(this); 
		var bank_obj=box_obj.find(".bank"); 
		var prov_obj=box_obj.find(".prov");
		var city_obj=box_obj.find(".city");
		var bank_val=settings.bank;
		var prov_val=settings.prov;
		var city_val=settings.city;
		var select_prehtml=(settings.required) ? "" : "<option value=''>��ѡ��</option>";
		var prov_json;
      // ��ֵʡ������
		var provStart=function(){
			var bank_id=bank_obj.get(0).selectedIndex; 
			if(!settings.required){
				bank_id--;
			};
			prov_obj.empty().attr("disabled",true);
			city_obj.empty().attr("disabled",true);
             
			if(bank_id<0||typeof(prov_json.banklist[bank_id].p)=="undefined"){
				
				if(settings.nodata=="none"){
					prov_obj.css("display","none");
					city_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					prov_obj.css("visibility","hidden");
					city_obj.css("visibility","hidden");
				};
				return;
			};
			
			// ������ֵʡ�������б�
			temp_html=select_prehtml;
			$.each(prov_json.banklist[bank_id].p,function(i,bank){
				temp_html+="<option value='"+bank.n+"'>"+bank.n+"</option>";
			});
			prov_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
			cityStart();
		};


			// ��ֵ�м�����
		var cityStart=function(){
			var bank_id=bank_obj.get(0).selectedIndex;
			var prov_id=prov_obj.get(0).selectedIndex;
			if(!settings.required){
				bank_id--;
				prov_id--; 
			};
			city_obj.empty().attr("disabled",true);  
			if(bank_id<0||prov_id<0||typeof(prov_json.banklist[bank_id].p[prov_id].c)=="undefined"){
				if(settings.nodata=="none"){
					city_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					city_obj.css("visibility","hidden");
				};
				return;
			};
			
			// ������ֵ�м������б�
			temp_html=select_prehtml;
			$.each(prov_json.banklist[bank_id].p[prov_id].c,function(i,prov){
				temp_html+="<option value='"+prov.s+"'>"+prov.s+"</option>";
			});
			city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
		};


		var init=function(){
			// ������ֵʡ�������б�
			temp_html=select_prehtml;
			$.each(prov_json.banklist,function(i,bank){
				 temp_html+="<option value='"+bank.b+"'>"+bank.b+"</option>";
			});   
			// $("#"+settings.bankId).html(temp_html);
			  bank_obj.html(temp_html);  
			// ���д���ʡ�����м���ֵ����ѡ�С���setTimeoutΪ����IE6�����ã�
			setTimeout(function(){
				if(settings.bank!=null){
					bank_obj.val(settings.bank);
					provStart();
					setTimeout(function(){
						if(settings.prov!=null){
							prov_obj.val(settings.prov);
							cityStart();
							setTimeout(function(){
								if(settings.city!=null){
									city_obj.val(settings.city);
								};
							},1);
						};
					},1);
				};
			},1);
			// ѡ������ʱ��ʱ�����¼�
			bank_obj.bind("change",function(){
				provStart();
			});

			// ѡ���м�ʱ�����¼�
			prov_obj.bind("change",function(){
				cityStart();
			});
		};
 

		// ����ʡ��json����
		if(typeof(settings.url)=="string"){ 
			$.getJSON(settings.url,function(json){   
				prov_json=json; 
				init();
			});
		}else{ 
			prov_json=settings.url;
			init();
		};
	};
})(jQuery);