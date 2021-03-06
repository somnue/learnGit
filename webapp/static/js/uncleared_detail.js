$(function () {

    $.datetimepicker.setLocale('ch');

    var $startDate = $('#startDate');
    var $infSearchSubmit = $("#infSearchSubmit"),
		$pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $goodsNum = $("#goodsNum"),
        $withholdNum = $("#withholdNum"),
        $name = $("#name"),
        $caseName = $("#caseName"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $downloadBtn = $("#downloadBtn"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
		goodsNumVal = getHashString('gdsId') || "",
		withholdNumVal = getHashString('wId') || '',
		caseNameVal = getHashString('cNm') ? unescape(getHashString('cNm')) : '',
		nameVal = getHashString('nm') ? unescape(getHashString('nm')) : '',
        startDate = getHashString('sD') || '',
        OrgId = getHashString('orgId') || '',
        pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10';

    function webInit() {
        $startDate.val(startDate);
        $withholdNum.val(withholdNumVal);
        $name.val(nameVal);
        $caseName.val(caseNameVal);
        $goodsNum.val(goodsNumVal);
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
        getTableData();
        zTreeObjClick();
    }

    /**
     * 获取table数据
     * @param params
     */

    function getTableData() {
        var params = {
            pageNum: pageNum,
            pageSize: pageSize,
            subOfficNo: OrgId,
            date: startDate,
            invlvAmtId: goodsNumVal,
            dtnNtcId: withholdNumVal,
            invlvOprNm: nameVal,
            caseNm: caseNameVal
        }
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&sD=" + startDate +
		"&gdsId=" + goodsNumVal +
		"&wId=" + withholdNumVal +
		"&nm=" + escape(nameVal) +
		"&cNm=" + escape(caseNameVal);
        akAjax('post','/akadmin/agent/unsettled',params,function(data){
            $templateBox.html('');
            if (data.status == 1) {
                $noData.hide();
                data.pageNum = pageNum;
                data.pageSize = pageSize;

				data.list.map(function(v) {
					v.dateTm && v.dateTm != ""?v.sDate = new Date(v.dateTm).toLocaleString('chinese',{hour12:false}):v.sDate = "";
					v.allAmt = filterMoney(v.invlvAmt + v.intamt);
					v.surpAmt = filterMoney(v.surpAmt);
					v.invlvAmt = filterMoney(v.invlvAmt);
					v.intamt = filterMoney(v.intamt);
				});
				data.sum.pnpAmt = filterMoney(data.sum.pnpAmt);
				data.sum.invlvAmt = filterMoney(data.sum.invlvAmt);
				data.sum.intamt = filterMoney(data.sum.intamt);
				data.sum.surpAmt = filterMoney(data.sum.surpAmt);
				data.sum.pnInt = filterMoney(data.sum.pnInt);
                templateBoxRender(data);
                resetBoxHeight();
                //按钮数据刷新
				$("#pages").data('page').refresh({
					pageNum:pageNum,
					pageSize:pageSize,
					count:data.count
					});
                gMaxPage = Math.ceil(data.count / pageSize);
                $page_total.html('共 '+ data.count +' 条');
                $pageNumIpt.val(pageNum);
                $downloadBtn.prop('href','/akadmin/agent/unsettledDown?subOfficNo='+OrgId+'&date='+startDate+'&invlvAmtId='+goodsNumVal+'&dtnNtcId='+withholdNumVal+'&caseNm='+caseNameVal+'&invlvOprNm='+nameVal);
                
            } else {
                $noData.show().html('暂无数据');
				$pages_pageHide.hide();
            }
            $infSearchSubmit.prop('disabled', false);
		},
		function(err){
			$templateBox.html('');
            $noData.show().html('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
			$pages_pageHide.hide();
		});
    }

    /**
     * table页面渲染
     * @param data
     */
    function templateBoxRender(data) {
        var html = template('tabelTem', data);
        $templateBox.html(html);
		$pages_pageHide.show();
    }


    /**
     * zTreeObj点击初始化
     */
    function zTreeObjClick() {
        if (!zTreeObj || zTreeObj === '') {
            setTimeout(function () {
                zTreeObjClick();
            }, 1000);
        } else {
            zTreeObj.setting.callback.onClick = function (event, treeId, treeNode) {
                OrgId = treeNode.id;
                pageNum = 1;
                $infSearchForm[0].reset();
                startDate = '';
                goodsNumVal = '';
                withholdNumVal = '';
                caseNameVal = '';
                nameVal = '';
                getTableData();
            };
        }
    }
    /**
     * form提交
     */
    $infSearchForm.submit(function () {
        //获取表单数据
        startDate = $startDate.val();
        withholdNumVal = $withholdNum.val();
        nameVal = $name.val();
        caseNameVal = $caseName.val();
        goodsNumVal = $goodsNum.val();
        //清除pageNum
        pageNum = 1;

        $infSearchSubmit.prop('disabled', true);
        getTableData();
        return false;
    });


    /**
     * 按钮点击事件
     */
    $("#pages").on("pageChanged", function (event, params) {
        pageNum = params.pageNum;
        pageSize = params.pageSize;
        getTableData();
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
		getTableData();
	});

    webInit();

    $("#print").click(function () {
        $("#printContent").print();
    });

    $startDate.datetimepicker({
        format:'Y/m/d',
        timepicker:false
    });
});