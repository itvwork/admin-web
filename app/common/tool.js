export default function(Vue, opt) {
    Vue.prototype.$tool={
        formatDate:function (arg) {
            var now = new Date(parseInt(arg) * 1000)
            var   year=now.getFullYear();
            var   month=now.getMonth()+1;
                  month=month>=10?month:'0'+month;
            var   date=now.getDate();
                  date=date>=10?date:'0'+date;
            var   hour=now.getHours();
                  hour=hour>=10?hour:'0'+hour;
            var   minute=now.getMinutes();
                  minute=minute>=10?minute:'0'+minute;
            var   second=now.getSeconds();
                  second=second>=10?second:'0'+second;
            return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;


        },
        base64: function(width, file, isshow) {
            var i = 0;
            var len = file.length;
            var arr = [];
            return new Promise(function(resolve, reject) {
                for (var a = 0; a < len; a++) {
                    let imgname = file[a].name;
                    let index1 = imgname.lastIndexOf(".");
                    let index2 = imgname.length;
                    imgname = imgname.substring(index1 + 1, index2); //后缀名
                    let type = "";

                    switch (imgname){
                        case 'gif':
                            type = 'image/gif'
                            break;
                        case 'png':
                            type = 'image/png';
                            break;
                        case 'jps':
                            type = 'image/jps';
                            break;
                        default:
                            type = 'image/jpeg';
                    }

                    lrz(file[a], {
                        width: width,
                        quality: 0.8,
                        type: type
                    }).then(function(rst) {
                        i++;
                        let base64Data = rst.base64.replace(/^data:image\/\w+;base64,/, "");
                        if (isshow) {
                            arr.push({
                                type: imgname,
                                data: base64Data,
                                url: rst.base64
                            })

                        } else {
                            arr.push({
                                type: imgname,
                                data: base64Data
                            })
                        }

                        if (i >= len) {
                            resolve(arr);
                        } else {
                            reject(error);
                        }
                    });
                }
            })
        },
    }


}
