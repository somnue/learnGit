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
function changeW(_obj, _order) { 
    if (checkKeyForInt(_obj.value, event))
        return;
    var _value = parseInt(_obj.value);
    var _valueStr = _obj.value;
    if (isNaN(_value))
        return;
    //����_order���жϼ�����һ��
    var _trContainer = 'trContainer';
    var _tdContainer = 'tdContainer';

    if (_value == 0 || _valueStr.length < 1) {
        _historyValue = _value;
        alert("#" + _tdContainer+_order);
        $("#" + _tdContainer+_order).empty();
        $("#" + _trContainer+_order).hide();
        return;
    }
    var _htmlStr = '';
    var _tableHeadStr = '';
    var _tableEndStr = '';
    var _newValue = _value - _historyValue;
    var _length = 0;
    var _numValue = 0;
    if (_historyValue == _value) {
        return;
    }

 
    //�����
    if (_newValue > 0) {
        //��ȡ���һ��Ԫ��
        var _numh = _areaCount;
          if (_order == 5) {
            _tableHeadStr = ' <table class="form_tab_content">';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                 _htmlStr += '<tr id="tr' + _areaCount +_order+'"> <th>�������к�</th> <td><input name="Input52" type="text" class="text3" /></td>';
                 _htmlStr += ' <th>�������</th> <td><input name="Input52" type="text" class="text3" /></td>  </tr>';
                _areaCount += 1;
            }
          } else if (_order == 6) {
            _tableHeadStr = ' <table class="form_tab_content">';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                _htmlStr += '<tr id="tr' + _areaCount +_order+'">  <th>��֧�����������к�</th> <td><input name="Input52" type="text" class="text3" /></td> </tr>';
                _areaCount += 1;
            }
        }  
        if (_historyValue == 0) {
            $("#" + _tdContainer+_order).html(_tableHeadStr + _htmlStr + _tableEndStr);
        } else {
            $("#tr" + (_numh - 1)+_order).after(_htmlStr);
        }
        _historyValue = _value;
        $("#" + _trContainer+_order).show();
    } else {
        //��ɾ��    Ĭ�ϴӺ��濪ʼɾ��
        _newValue = _historyValue - _value;
        for (var i = 1; i < _newValue + 1; i++) {
            $("#tr" + (_areaCount - 1)+_order).remove();
            _areaCount += -1;
        }
        _historyValue = _value;
        return;
    }
}

