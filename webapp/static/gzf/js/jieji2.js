/**
 * @author TianHan  3-1-1-2.html
 */
//���ҵ��¼��
$(function() {   
    $("#inputId0").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });

    $("#inputId1").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });
    $("#inputId2").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });


    //���������ťʱ���ȡ����ֵ
    $("#addButton2").click(function() {
        var arry = new Array();
        for (var i = 0; i < 3; i++) {
            arry[i] = $("#inputId" + i).val();
        }
        //��ȡtable�����һ��tr
        var _index = $("#table_list2 tr").length - 2;
        var _htmlStr = "<tr id=''><td><input type='radio' name='radiobutton' value='radiobutton' /></td>";
        _htmlStr += "<td>" + arry[0] + "</td><td>" + arry[1] + "</td><td>" + arry[2] + "</td></tr>";
        getObjByIndex(_index).after(_htmlStr);
    })
    
    
    var _length=$("#table_list2 tr").length;
     
    //ͨ��������ȡtr����
    function getObjByIndex(_index) {
        return $("#table_list2 tr").eq(_index);
    }
    //��ȡѡ�е�radio��Ԫ�ص�tr����
    function getRadio() {
        return $('input:radio[name="radiobutton"]:checked');
    }

    function getTrIndex() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr").index();
    }

    function getTr() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr");
    }
    

    //�޸�
     $("#updateButton2").click(function() {
         var arry = new Array();
          for (var i = 0; i < 3; i++) {
             arry[i] = $("#inputId" + i).val();
         } 
         $('input:radio[name="radiobutton"]:checked').parent("td").nextAll().each(function(i) { 
                $(this).text(arry[i]);
         });  
     })
    
   
    
    //����radio
       $('input:radio[name="radiobutton"]').live("click",function(){ 
        var arry = new Array();
        if (getTrIndex() > 0) {
            $('input:radio[name="radiobutton"]:checked').parent("td").nextAll().each(function(i) {
                arry[i] = $.trim($(this).text());
            });
        } else {
            alert("δѡ�����!");
        }
        for (var i = 0; i < 3; i++) {
            $("#inputId" + i).val(arry[i]);
        }

    })
    //ɾ��
    $("#deleteButton2").click(function() {
        if (getTrIndex() > 0) {
            getObjByIndex(getTrIndex()).remove();
            emptyInput();
        } else {
            alert("δѡ�����!");
        } 
    })
    
    //���ɾ��֮�����input
    function emptyInput(){ 
        for (var i = 0; i < _length; i++) {
             $("#inputId" + i).val("");
        }
        
    }
})
