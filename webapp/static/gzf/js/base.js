/**
 * @author TianHan
 */
//�����ֻ����������
function checkRate(input)
{
     var re =/^[1-9]+[0-9]*]*$/;   //�ж��ַ����Ƿ�Ϊ����     //�ж������� /^[1-9]+[0-9]*]*$/  
     if (!re.test(input.rate.value))
    {
        alert("����������!");
        input.rate.focus();
        return false;
     }
}

function isNumber(){
  isNum = /^[0-9]*$/;
  alert(isNum.test($("minsize").value));
}