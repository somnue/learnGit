/**
 * @author TianHan
 * ��̬����td
 */

//ֻ������������
function checkKeyForInt(value, e) {
    var isOK = false;
    var key = window.event ? e.keyCode : e.which;
    if ((key > 95 && key < 106) || //С�����ϵ�0��9
    (key > 47 && key < 60) || //������ϵ�0��9
    key == 8 || key == 9 || key == 46 || key == 37 || key == 39 //��Ӱ�������༭����ʹ��(8:BackSpace;9:Tab;46:Delete;37:Left;39:Right)
    ) {
        isOK = true;
    } else {
        if (window.event)//IE
        {
            e.returnValue = false;
            //event.returnValue=false Ч����ͬ.
        } else//Firefox
        {
            e.preventDefault();
        }
    }
    return isOK;
}

    var _historyValue = parseInt(0);
    var _areaCount = 0;
    function changeX(_obj) {  
        if (checkKeyForInt(_obj.value,event))return;
        var _value = parseInt(_obj.value); 
        var _valueStr = _obj.value; 
        if(isNaN(_value))return;  
        if (_value == 0) {
            _historyValue = _value;
            $("#divContainer").empty();
            $("#trContainer").hide();
            return;
        }  
        var _htmlStr = '';
        var _newValue = _value - _historyValue;
        var _length = 0;
        var _numValue = 0;
        if (_historyValue == _value) {
            return;
        } 

     var _tableHeadStr='<table class="table_list" > <tr id="headInfo">  <th>���ջ��ش������</th> <th>Ԥ���Ŀ����</th>  <th>������</th> </tr>  ';
     var _tableStrEnd='</table>';
    //�����
    if (_newValue > 0) {
        //��ȡ���һ��Ԫ��
        var _numh = _areaCount;
        for (var i = 0; i < _newValue; i++) {
             _htmlStr +='<tr id="tr' + _areaCount + '"><td><select name="" class="text3"> <option value="1111111111:��˰">1111111111:��˰</option>';
             _htmlStr +='<option value="2222222222:��˰">2222222222:��˰</option><option value="3333333333:����">3333333333:����</option>';
             _htmlStr +='<option value="4444444444:����">4444444444:����</option><option value="5555555555:����">5555555555:����</option>';
             _htmlStr +='</select> </td><td><input name="Input5" type="text" class="text3" /></td><td><input name="Input5" type="text" class="text3" /></td> </tr>';
             _areaCount += 1;
        }
        if (_historyValue == 0) {
            $("#divContainer").html(_tableHeadStr+_htmlStr+_tableStrEnd);
        } else {
            $("#tr" + (_numh - 1)).after(_htmlStr);
        }
        _historyValue = _value;
        $("#trContainer").show();
    } else {
        //��ɾ��    Ĭ�ϴӺ��濪ʼɾ��
        _newValue = _historyValue - _value;
        for (var i = 1; i < _newValue + 1; i++) {
            $("#tr" + (_areaCount - 1)).remove();
            _areaCount += -1;
        }
        _historyValue = _value;
        return;
    }
}
