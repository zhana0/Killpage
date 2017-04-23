# Killpage
javascript分页类
注意：
需配合jquery使用，在引用此类之前需先引用jquery。
若在html标签中使用实例化对象的方法，需要将实例化对象设为全局变量.

方法：

实例化

var k = new Killpage(arg1,arg2);//参数非必填;arg1为需要操作的jqury对象，arg2为每页显示数量

k.setMaxPrePage(num);//设置每页显示数量

k.getDataFromServer("server.php",{});//返回Killpage对象，参数1必填，为需要获取数据的服务器地址;参数2非必填，为post的数据，格式为json对象

k.syncTable();//返回Killpage对象，同步数据到jquery对象

k.generatePageNumHTML(objectName);//参数必填，为实例化对象名;返回上一页下一页与页码a标签;

k.nextPage();//下一页

k.prevPage();//上一页

k.selectPage(num);//选择第几页，num为页数

k.getData();//获取生成的分页数据

k.getCountPage();//获取总共做需页数
