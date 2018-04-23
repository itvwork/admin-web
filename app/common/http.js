export default function(Vue, opt) {
    Vue.prototype.$ajax = {
        argUrl: function() {
            var result = [];

            function argFormat(obj, name) {
                if (typeof obj === "object") {
                    for (let i in obj) {
                        if (typeof obj[i] === "object") {
                            name ? argFormat(obj[i], name + '[' + i + ']') : argFormat(obj[i], i);
                        } else {
                            if (name) {
                                result.push(name + "[" + i + "]" + '=' + encodeURIComponent(obj[i]));
                            } else {
                                result.push(i + '=' + encodeURIComponent(obj[i]));
                            }
                        }
                    }
                    return result.join('&');
                } else {
                    result += obj;
                    return result;
                };
            }
            return argFormat(obj);
        },
        xhr2: function(obj) {
            var past = new FormData();

            function argFormat(obj, name) {
                if (typeof obj === "object") {
                    for (let i in obj) {
                        if (typeof obj[i] === "object") {

                            if (obj[i].lastModified) {
                                past.append(name, obj[i]);
                            } else {
                                name ? argFormat(obj[i], name + '[' + i + ']') : argFormat(obj[i], i);
                            }
                        } else {
                            if (name) {
                                past.append(name + "[" + i + "]", obj[i]);

                            } else {
                                past.append(i, obj[i])

                            }
                        }
                    }
                    return past;
                } else {
                    return obj;
                };
            }

            return argFormat(obj);
        },
        post: function(url, ps) {
          // var encrypted = CryptoJS.TripleDES.encrypt(ency, key);
          // var decrypted = CryptoJS.TripleDES.decrypt(encrypted.toString(), key);
          // var ls = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
            var deskey=this.randomArr(200);
            var self = this;
            var data = {
                data:CryptoJS.AES.encrypt(JSON.stringify(ps.data), deskey).toString(),
                key:this.rsaEncrypt(deskey),
            };

            if(ps.token){
              data['token']={
                key:ps.token,
                timetemp:this.time()
              }
              data['token']=this.rsaEncrypt(JSON.stringify(data['data']));
            }



            return new Promise(function(resolve, reject) {
                var xmlhttp;
                if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else { // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                };
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        try {
                            let res =JSON.parse(xmlhttp.responseText);
                            if(res.data){
                              var decrypted = CryptoJS.AES.decrypt(res.data, deskey);
                              res.data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                            }
                            resolve(res);
                        } catch (e) {
                            resolve(xmlhttp.responseText);
                        }
                    }
                };

                var urldata = self.argUrl(data);

                xmlhttp.open("POST", url, true);
                //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                xmlhttp.setRequestHeader("Accept", "*/*");
                // xmlhttp.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
                xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头信息
                xmlhttp.send(urldata);

            })
        },

        postXhr2: function(url, context) {
            var self = this;
            context = {
                rsa: JSON.stringify({
                    token: context.token,
                    timetemp: this.time(),
                    type: context.type
                }),
                data: JSON.stringify(context.data)
            };
            var rsa = this.publicKey();
            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(rsa);
            context.rsa = jsencrypt.encrypt(JSON.stringify(context.rsa), 'base64');
            return new Promise(function(resolve, reject) {
                var xmlhttp = new XMLHttpRequest();
                if (typeof FormData !== 'undefined') { //判断是否支持xhr2
                    var urldata = self.xhr2(context);
                    //这里具体查看你上面ajax内容
                    xmlhttp.timeout = context.timeout ? context.timeout : 100000;
                    xmlhttp.addEventListener('progress', function(e) {

                        context.progress ? context.progress(e) : '';
                    })
                    xmlhttp.addEventListener('load', function(e) {

                        context.load ? context.load(e) : '';
                    })
                    xmlhttp.addEventListener('error', function(e) {

                        context.error ? context.error(e) : '';
                    })
                    xmlhttp.addEventListener('loadstart', function(e) {
                        context.loadstart ? context.loadstart(e) : '';

                    })
                    xmlhttp.addEventListener('loadend', function(e) {

                        context.loadstart ? context.loadstart(e) : '';
                    })

                } else {
                    var urldata = self.argUrl(context);
                }
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        resolve(JSON.parse(xmlhttp.responseText));
                    }
                };

                xmlhttp.open("POST", url, true);
                //  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                //xmlhttp.setRequestHeader('Content-Type', 'multipart/form-data;boundary=-----');
                xmlhttp.setRequestHeader("Accept", "*/*");
                // xmlhttp.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
                // xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头信息
                xmlhttp.send(urldata);

            })
        },
        postBlob: function(url, data) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.timeout = 10000;
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    resolve(JSON.parse(xmlhttp.responseText));
                }
            };
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Accept", "*/*");
            // xmlhttp.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
            // xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头信息
            xmlhttp.send(data);

        },
        rsapost: function(url, data) {
            var self = this;
            data = JSON.stringify(data);
            var rsa = this.publicKey();
            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(rsa);
            var rsas = jsencrypt.encrypt(data, 'base64');
            var context = {
                rsa: rsas
            };

            return new Promise(function(resolve, reject) {
                var xmlhttp;
                if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else { // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                };
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        try {
                            resolve(JSON.parse(xmlhttp.responseText));
                        } catch (e) {
                            resolve(xmlhttp.responseText);
                        }

                    }
                };

                var urldata = self.argUrl(context);
                xmlhttp.open("POST", url, true);
                //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                xmlhttp.setRequestHeader("Accept", "*/*");
                // xmlhttp.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
                xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头信息
                xmlhttp.send(urldata);

            })

        },
        argUrl(obj) {
            var result = [];

            function argFormat(obj, name) {
                if (typeof obj === "object") {
                    for (let i in obj) {
                        if (typeof obj[i] === "object") {
                            name ? argFormat(obj[i], name + '[' + i + ']') : argFormat(obj[i], i);
                        } else {
                            if (name) {
                                result.push(name + "[" + i + "]" + '=' + encodeURIComponent(obj[i]));
                            } else {
                                result.push(i + '=' + encodeURIComponent(obj[i]));
                            }
                        }
                    }
                    return result.join('&');
                } else {
                    result += obj;
                    return result;
                }
            }
            return argFormat(obj);
        },
        xhr2: function(obj) {
            var past = new FormData();

            function argFormat(obj, name) {
                if (typeof obj === "object") {
                    for (let i in obj) {
                        if (typeof obj[i] === "object") {
                            if (obj[i].lastModified) {
                                past.append(name, obj[i]);
                            } else {
                                name ? argFormat(obj[i], name + '[' + i + ']') : argFormat(obj[i], i);
                            }
                        } else {
                            if (name) {
                                past.append(name + "[" + i + "]", obj[i]);

                            } else {
                                past.append(i, obj[i])

                            }
                        }
                    }
                    return past;
                } else {
                    return obj;
                };
            }

            return argFormat(obj);
        },
        time: function() {
            return parseInt(new Date().getTime() / 1000);
        },
        publicKey: function() {
            var rsa = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAydjYzX9HlsMBzN8ij73xY40tj7QPzGfsrSrT81Lruv90qn+o3J/ppK+prOuFVMMGV0vna8tu+BnBw8GsKbHLSU9dcSMyGcRL/IHo0aRZ7WCDKvTZeKSJtS3Qn8ltUflDe1DW3d9vlvHEV8trkQiY4YpZ/ZgTk0v7tREOqgbAiu0W4wEKLAavqUPtyUQFj0bAa46wrH86boZMr1leGD8cueoK1M9Idom6i213UpOpbMKOfpLz0QWT5y52qseTJ/IpivTvq+lDcNxNx1kNLrMWQsTKgbHC9Y9SQMF9ArcY661So/bAi5n+3h62+FpY+1ce4+qSHJo67S+VA7yGh33S2wIDAQAB-----END PUBLIC KEY-----'

            return rsa;
        },
        randomArr: function(num) {
            var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMMOPQRSTUVWXYZ!@#$%^&*()_+~￥。';
            var key = "";
            for (var i = 0; i < num; i++) {
                key += str[parseInt(Math.random() * (str.length - 1))];
            }
            return key;
        },
        rsaEncrypt(str){
          var rsa = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAydjYzX9HlsMBzN8ij73xY40tj7QPzGfsrSrT81Lruv90qn+o3J/ppK+prOuFVMMGV0vna8tu+BnBw8GsKbHLSU9dcSMyGcRL/IHo0aRZ7WCDKvTZeKSJtS3Qn8ltUflDe1DW3d9vlvHEV8trkQiY4YpZ/ZgTk0v7tREOqgbAiu0W4wEKLAavqUPtyUQFj0bAa46wrH86boZMr1leGD8cueoK1M9Idom6i213UpOpbMKOfpLz0QWT5y52qseTJ/IpivTvq+lDcNxNx1kNLrMWQsTKgbHC9Y9SQMF9ArcY661So/bAi5n+3h62+FpY+1ce4+qSHJo67S+VA7yGh33S2wIDAQAB-----END PUBLIC KEY-----';
          var jsencrypt = new JSEncrypt();
          jsencrypt.setPublicKey(rsa);
          return jsencrypt.encrypt(str, 'base64');
        }


    }


}
