/**
 * @author TianHan
 */
//���ҵ��¼��

jQuery.table = {
        //_coninterId:table��ID
    adu : function(_coninterId,_operate, _someStr) {
        // _operate--1:����,2:�޸�,3:ɾ��
        var _container=$("#"+_coninterId).children("tr").
        var operateArray = new Array("1", "2", "3");
        var somStrArray = new Array("1", "2", "3");
        if (_operate == operateArray[0]) {
            //���������ťʱ���ȡ����ֵ
            var arry = new Array();
            for (var i = 0; i < 5; i++) {
                arry[i] = $("#inputId" + i).val();
            }
            //��ȡtable�����һ��tr
            var _index = _container.length - 2;
            var _htmlStr = "<tr id=''><td><input type='radio' name='radiobutton' value='radiobutton' /></td>";
            _htmlStr += "<td>" + arry[0] + "</td><td>" + arry[1] + "</td><td>" + arry[2] + "</td><td>" + arry[3] + "</td><td>" + arry[4] + "</td></tr>";
            getObjByIndex(_index).after(_htmlStr); 
        } else if (_operate == operateArray[1]) {
            
            
            

        } else if (_operate == operateArray[2]) {

        }

        alert("����");
    }
}

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
    $("#inputId3").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });

    var _length = $("#table_list tr").length;

    //ͨ��������ȡtr����
    function getObjByIndex(_index) {
        return _container.eq(_index);
    }

    //��ȡѡ�е�radio
    function getRadio() {
        return $('input:radio[name="radiobutton"]:checked');
    }

    //��ȡtr
    function getTr() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr");
    }

    //��ȡtr��Index
    function getTrIndex() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr").index();
    }

    //�޸�
    $("#updateButton").click(function() {
        var arry = new Array();
        for (var i = 0; i < 5; i++) {
            arry[i] = $("#inputId" + i).val();
        }

        $('input:radio[name="radiobutton"]:checked').parent("td").nextAll().each(function(i) {
            $(this).text(arry[i]);
        });
    })
    //����radio
    $('input:radio[name="radiobutton"]').live("click", function() {
        var arry = new Array();
        if (getTrIndex() > 0) {
            $('input:radio[name="radiobutton"]:checked').parent("td").nextAll().each(function(i) {
                arry[i] = $.trim($(this).text());
            });
        } else {
            alert("δѡ�����!");
        }
        for (var i = 0; i < 5; i++) {
            $("#inputId" + i).val(arry[i]);
        }

    })
    //ɾ��
    $("#deleteButton").click(function() {
        if (getTrIndex() > 0) {
            getObjByIndex(getTrIndex()).remove();
            emptyInput();
        } else {
            alert("δѡ�����!");
        }
    })
    //���ɾ��֮�����input
    function emptyInput() {
        for (var i = 0; i < _length; i++) {
            $("#inputId" + i).val("");
        }

    }

})
