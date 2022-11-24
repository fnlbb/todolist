$(document).ready(function () {
    //定义数据类型
    load();
    $('#title').on("keydown",function (event) {
        var str = $(this).val(),
        parent = /^[\s]*$/;
        
        if (event.keyCode === 13) {
            if (parent.test(str) || str =="") {
                alert("请输入添加事项")
            }else {
                var local= getDate();
                local.push({ title: $(this).val(),done: false});
                saveDate(local);
                load();                
            }
            //按下确认后，清空输入框
            $(this).val("");
        }        
    });
    //点击a标签删除
    var data = getDate();
    $("ol,ul").on("click","a",function () {
        var data = getDate();
        var index = $(this).attr("id");
        data.splice(index,1);
        saveDate(data);
        load();
    });
    //点击复选框，进行和完成操作
    $("ol,ul").on("click","input",function () {
        var data = getDate();
        //修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    })


    //存储到本地数据
    function saveDate(data) {
        localStorage.setItem("todo",JSON.stringify(data));
    };
    //获取数据
    function getDate() {
        var data =localStorage.getItem("todo");
        if (data !== null) {
            //本地存储的数据是字符串格式，需转换
            return JSON.parse(data);
        }else {
            return [];
        }    
    }
    //渲染加载数据
    function load() {
        var data = getDate();
        //遍历前清空
        $("ol,ul").empty();
        //统计个数
        var todocount = 0;
        var donecount = 0;        
        $.each(data, function (i, n) { 
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'>\
                 <p>" + n.title +"</p> <a href ='#' id="+ i +"></a></li>");
                donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title +"</p>\
                <a href ='#' id="+ i +"></a></li>");
                todocount++;
            }
        })
        $(".todocount").text(todocount);
        $(".donecount").text(donecount);
    }
})