///////////////////////
//构造方法,参数1为操作的table对象,对象类型为jqueryobject,参数2为每页显示数量
function Killpage(jQueryObject,maxPrePage) {
 
    var selectUrl = "";

    //所生成的二维数组,例如:每页显示5行数据,则数组中有5个成员,每个成员的值为对应页应该显示的行信息
    var newArray = [];

    //需要操作的table对象,对象为jQuery对象,构造方法传入
    var $obj = jQueryObject;

    //当前页
    var currentPage = 0;

    //总页数
    var countPage = 0;

    //设置每页显示数量
    var maxPrePage = maxPrePage;

    //获取到的数据
    var data;

    //设置每页显示数量
    this.setMaxPrePage = function(num){
	if (num == null && num == "" && num == 0 && num == undefined){
		console.log("每页显示数量设置错误");
		return false;
	}else{
		maxPrePage = num;
		return this;
	}
    }

    //下一页
    this.nextPage = function () {
	if (currentPage >= countPage-1){
		currentPage = countPage-1;
	}else{
		currentPage++;
		this.syncTable();
	}
	this.syncTable();
    };

    //上一页
    this.prevPage = function () {
	if (currentPage <= 0){
		currentPage = 0;
		//this.syncTable();
	}else{
		currentPage--;
		this.syncTable();
	}
    };

    //选择currentPage-1中的某一页
    this.selectPage = function (num) {
	if (num>countPage-1 && num<0) return false;
	currentPage = num;
	this.syncTable();
    };

    //获取处理后的数据
    this.getData = function () {
        return newArray;
    };

    //从服务器获取数据,默认参数url为this.urlString对象中select属性值
    this.getDataFromServer = function () {

        //js中设置默认函数参数值的方法,arguments储存的是函数的参数集合,脚表代表第几个参数
        //参数1:默认this.selectUrl
        //参数2:默认空对象
        var url = arguments[0] ? arguments[0] : selectUrl;
        var dataObject = arguments[1] ? arguments[1] : {};

        //验证url是否正确,错误信息在console中提示
        if (url == "" || url == undefined || url == false) return console.log("请设置查询地址");

        //ajax请求,设置为同步加载，否则无法处理数据
        var dataText = $.ajax(
            {
                async:false,
                url: url,
                type: 'post',
                data: dataObject,
                success: function () {
                    console.log("连接成功");
                },
                error: function () {
                    console.log("连接失败");
                }
            }
        ).responseText;

        data = eval(dataText);

        this.generateData();

	return this;
    };

    //生成分页数据
    this.generateData = function () {
        var dataLength = data.length;
        var num = 0;
        var pageN = 0;


        for (var i=0;i<dataLength;i++) {
            if (data[num] == undefined) break;
            newArray[pageN] = [];
            for (var k=0;k<maxPrePage;k++){
                if (data[num] == undefined) break;
                newArray[pageN][k] = data[num];
                num++;
            }
            pageN++;
        }
        countPage = newArray.length;
    };

    //获取总共所需页数
    this.getCurrentPage = function () {
        return countPage;
    };

    //同步table中的数据
    this.syncTable = function () {
        if (newArray.length < 0){
		console.log("未生成分页数据");
		return false;
	}
	if (maxPrePage == 0 && maxPrePage == "" && maxPrePage == null && maxPrePage == undefined){
		console.log("每页显示数量获取失败");
		return false;
	}

	var tmpArr = newArray[currentPage];

        var html = "";

        for (var i=0;i<maxPrePage;i++) {
            html += '<tr>';
            for (value in tmpArr[i]){
                html += '<td>'+ tmpArr[i][value] +'</td>';
            }
            html += '</tr>';
        }
        $obj.empty();
        $obj.append(html);

	return this;
    };
    
    //生成页码HTML
    this.generatePageNumHTML = function (objectName) {
         var html = '<a href="javascript:' + objectName + '.prevPage()">上一页</a>';
         for (var i = 1; i <= countPage; i++) {
             html += '<a href=javascript:' + objectName + '.selectPage(' + (i-1) + ')>' + i + '</a>';
         }
         html += '<a href="javascript:' + objectName + '.nextPage()">下一页</a>';
         return html;
    };
}
