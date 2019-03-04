$(function () {
    var $infForm = $('#infForm'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $submitBtn = $('#submitBtn'),
        $operatorIdHide = $('#operatorIdHide'),
        $operatorModal = $('#operatorModal'),
        $seePics = $('#seePics'),
        $payMoneyCapital = $('#payMoneyCapital'),
        $payMoney = $('#payMoney'),
        $templateBox = $("#templateBox"),
        $pages = $("#pages"),
        $noData = $("#noData"),
        $operator = $("#operator"),
        $operatorIDType = $("#operatorIDType"),
        $operatorID = $("#operatorID"),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $anKuanButtons = $('#anKuanButtons'),
        $page_total = $('#page_total'),
        $pageSizeIpt = $('#pageSizeIpt'),
        $pageNumIpt = $('#pageNumIpt'),
        operatorData=null;
        caseId = null,
        goodsNum = getQueryString('goodsNum') || '',
        pageSize = getParamsString('pS') || '10',
		pageNum = getParamsString('pN') || '1';


    /**
     * 数字函数
     * @param obj
     * @returns {*}
     */
    function onlyNumber(obj) {
        //先把非数字的都替换掉，除了数字和.
        obj = obj.replace(/[^\d\.]/g, '');
        //必须保证第一个为数字而不是.
        obj = obj.replace(/^\./g, '');
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, '.');
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        //只能输入两位小数
        obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        return obj
    }

    /**
     * 小写转大写
     * @param n
     * @returns {string}
     */
    function smalltoBIG(n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);

        var s = '';

        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    }

    /**
     * 页面初始化
     */
    function webInit() {
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
        if (!goodsNum || goodsNum === '') {
            return false;
        }
        akAjax('post','/akadmin/caseAccon/details',{invlvAmtId:goodsNum},function(data){
        	if (data && data.status === 1) {
            	data.akInvlvAmtIfmtDo.dtnTm && data.akInvlvAmtIfmtDo.dtnTm != ""?data.akInvlvAmtIfmtDo.sDate = new Date(data.akInvlvAmtIfmtDo.dtnTm).toLocaleString('chinese',{hour12:false}):data.akInvlvAmtIfmtDo.sDate = "";
            	data.akInvlvAmtIfmtDo.exdat && data.akInvlvAmtIfmtDo.exdat != ""?data.akInvlvAmtIfmtDo.eDate = new Date(data.akInvlvAmtIfmtDo.exdat).toLocaleString('chinese',{hour12:false}):data.akInvlvAmtIfmtDo.eDate = "";
				var infForm = $infForm[0];
                infForm.goodsNum.value = data.akInvlvAmtIfmtDo.invlvAmtId;
                infForm.dtnNtcId.value = data.akInvlvAmtIfmtDo.dtnNtcId;
                infForm.caseName.value = data.akInvlvAmtIfmtDo.caseNm;
                infForm.caseNum.value = data.akInvlvAmtIfmtDo.caseId;
                infForm.name.value = data.akInvlvAmtIfmtDo.invlvName;
                infForm.IDcardType.value = data.akInvlvAmtIfmtDo.crdtTpcd;
                infForm.IDcard.value = data.akInvlvAmtIfmtDo.crdtId;
                infForm.caseTime.value = data.akInvlvAmtIfmtDo.sDate;
                infForm.doneTime.value = data.akInvlvAmtIfmtDo.eDate;
                infForm.moneyNum.value = filterMoney(data.akInvlvAmtIfmtDo.invlvAmt);
                infForm.desc.value = data.akInvlvAmtIfmtDo.remark;
                infForm.payAccount.value = data.akInvlvAmtIfmtDo.accno;
                infForm.payAccountName.value = data.akInvlvAmtIfmtDo.accNm;
                infForm.payAccountAlias.value = data.akInvlvAmtIfmtDo.accAls;
                infForm.payMoneyed.value = filterMoney(data.akInvlvAmtIfmtDo.accba);
                $payMoney.val(filterMoney(data.akInvlvAmtIfmtDo.invlvAmt - data.akInvlvAmtIfmtDo.accba));
                $payMoneyCapital.val(smalltoBIG(data.akInvlvAmtIfmtDo.invlvAmt - data.akInvlvAmtIfmtDo.accba));
                caseId = data.akInvlvAmtIfmtDo.caseId;
                $seePics.prop('href', $seePics.data('akhref') + '?goodsNum=' + data.akInvlvAmtIfmtDo.dtnNtcId);
                getOperatorList();
            }
		});
    }


    function showAlert(msg) {
        if ($anKuanAlertInf.hasClass('alert-success')) $anKuanAlertInf.removeClass('alert-success');
        $anKuanAlertInf.addClass('alert-danger');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
        $anKuanAlertBtns.hide();
    }

    /**
     * 获取经办人列表
     * @param params
     */
    function getOperatorList() {
        var params = {
            pageNum: pageNum,
            pageSize: pageSize
        };
        sessionStorage.setItem('pathname',window.location.pathname);
        sessionStorage.setItem('params','#pN=' + pageNum +'&pS=' + pageSize);
        akAjax('post','/akadmin/ntc/operapor',params,function(data){
            $templateBox.html('');
            if (data.status == 1) {
                $noData.hide();
                $pages.show();
                operatorData = data;
                templateBoxRender(data);
                //按钮数据刷新
				$("#page_controller").show();
				$("#pages").data('page').refresh({
					pageNum:pageNum,
					pageSize:pageSize,
					count:data.count
					});
                gMaxPage = Math.ceil(data.count / pageSize);
                $page_total.html('共 '+ data.count +' 条');
                $pageNumIpt.val(pageNum);
            } else {
                $noData.show().html('暂无数据');
                $pages.hide();
				$("#page_controller").hide();
            }
		},
		function(err){
            $noData.show().html('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
            $pages.hide();
			$("#page_controller").hide();
		});
    }

    /**
     * table页面渲染
     * @param data
     */
    function templateBoxRender(data) {
        var html = template('tabelTem', data);
        $templateBox.html(html);
    }

    webInit();

    /**
     * 生成绑定通知书事件
     */
    $infForm.submit(function () {
        if ($payMoneyCapital.val() === '') return false;
        if (this.operator.value === ''
            || this.payMoney.value === ''
            || this.operatorIDType.value === ''
            || this.operatorID.value === '') {
            showAlert('以上为必填项,请填写');
            return false;
        }
        var obj = {
        	invlvAmtId: goodsNum,
            tpcd: this.payType.value,
            name: this.operator.value,
            crdtTpcd: this.operatorIDType.value,
            crdtId: this.operatorID.value,
            amtSmall: this.payMoney.value,
            amtLarge: this.payMoneyCapital.value
        };
        $anKuanAlert.hide();
        $submitBtn.prop('disabled', true);
        akAjax('post','/akadmin/ntc/genernte',obj,function(data){
            if (data && data.status == 1) {
                $operatorIdHide.val(data.bsnJrnlNo);
                window.location.href = './payNotePrint?bsnJrnlNo=' + data.bsnJrnlNo;
            } else {
                showAlert('通知书生成失败失败！原因：' + data.msg);
            }
            $submitBtn.prop('disabled', false);
		});
        return false;
    });

    /**
     * 小写金额输入事件
     */

    $('#payMoney').on('keyup', function () {
        var value = this.value.trim();
        if (value === '') return false;
        var newValue = onlyNumber(value);
        this.value = newValue;
        $payMoneyCapital.val(smalltoBIG(newValue));
    });


    /**
     * 按钮点击事件
     */
    $("#pages").on("pageChanged", function (event, params) {
        pageNum = params.pageNum;
        pageSize = params.pageSize;
        getOperatorList();
    });
	$("#page_submit").click(function(){
		var ps = $pageSizeIpt.val();
		if(ps != pageSize){
			pageSize= ps;
			pageNum = '1';
			$pageNumIpt.val(pageNum);
		}else{
			pageNum = $pageNumIpt.val();
		}
		getOperatorList();
	});

    /**
     * 模态框点击事件
     */
    $("#modalOk").click(function () {
        var index = $("input[name='operatorModalRadios']:checked").val();
        if (!index || index === '') return false;
        $operatorModal.modal('hide');
        $operator.val(operatorData.list[index].name);
        $operatorIDType.val(operatorData.list[index].crdtTpcd);
        $operatorID.val(operatorData.list[index].crdtId);
    });
});