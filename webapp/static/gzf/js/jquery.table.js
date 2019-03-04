/**
 * @author Tianhan
 */
 
;(function($) {  
    $.fn.extend({
        //�����л�ɫ 
        "setBgColor" : function(options) {
            //����Ĭ��ֵ
            option = $.extend({
                odd : "odd", //������
                even : "tr_even", //ż����
                selected : "tr_selected",
                over : "tr_mouse_over"//����ƶ���ȥʱ
            }, options);
            //���л�ɫ
            $("tbody>tr:even", this).addClass(option.even);
            $("tbody>tr:odd", this).addClass(option.odd);
            //�����б�ɫ
            $("tbody>tr", this).click(function() {
                $("tbody>tr").removeClass(option.selected);
                $(this).addClass(option.selected);  
                //��ѡ���������ʽ [hasSelected?"removeClass":"addClass"]�����Ƿ�����Ƴ��������ʽ
            });
            //����ƶ���ȥ��ɫ
            $("tbody>tr", this).mouseover(function() {
                $(this).addClass(option.over);
            });
            //����Ƴ�ʱ���ԭ������ʽ
            $("tbody>tr", this).mouseout(function() {
                $(this).removeClass(option.over);
            });
            return this;
            //����this��ʹ�������� ע�� ������뷵�� �����޷�ֱ�ӵĵ��÷���
        }
    });
})(jQuery);
