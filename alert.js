var sa;
if (!sa) {
    sa = {}
}
if (!sa.click) {
    sa.click = {}
}(function() {
    var t = /^\w*?.suning.com$/, //
        s = document.location.hostname,
        g = (("https:" == document.location.protocol) ? "https://" : "http://"),
        o = h(),
        b = "|",
        c = location.href,
        m = l(p(c)); //url码

    function q(Z, M) {
        var Y = Z.name ? l(Z.name) : "name undefined";
        if (Y == "name undefined") {
            var aa = Z.attributes.name;
            if (aa != undefined && aa != null) {
                Y = aa.value ? l(aa.value) : "name undefined"
            }
        }
        if (M != undefined && M != null && M != "") {
            var J = Z.attributes[M];
            if (J != undefined && J != null) {
                Y = J.value ? l(J.value) : M + " undefined"
            }
        }
        var N = Z.id ? l(Z.id) : "id undefined",
            Q = new Array(),
            z = (e(Z, Q), Q) ? l(Q.join("").replace(/\s|\|/ig, "")) : "text undefined",
            T = (T = document.getElementById("resourceType")) ? T.value : "",
            A = N + b + Y + b + z,
            R = (R = document.getElementById("errorCode")) ? R.value : "",
            W = g + o + "/ajaxClick.gif",
            y = u(),
            k = "_snck";
        i(k, y, "/", "", "");
        var X = n("_snmp"),
            D = typeof sn == "object" ? sn.cityId : "can not get cityId",
            I = y + b + X + b + A + b + m,
            V = Z.href ? Z.href : "",
            H = (V ? w(V) : "-"),
            K = document.getElementById("URLPattern"),
            P = (K ? K.value : "");
        var C = "";
        var F = n("logonStatus");
        if (F != undefined && F != null) {
            C = F
        }
        var E = "";
        var j = n("_snma");
        if (j != undefined && j != null && j.indexOf("|") >= 0) {
            try {
                E = j.split("|")[1]
            } catch (U) {}
        }
        var B = "";
        var x = n("idsLoginUserIdLastTime");
        if (x != undefined && x != null) {
            B = x
        }
        var S = "";
        var O = n("custno");
        if (O != undefined && O != null) {
            S = O
        }
        var L = "";
        var ab = n("_snmb");
        if (ab != undefined && ab != null && ab.indexOf("|") >= 0) {
            try {
                L = ab.split("|")[0]
            } catch (U) {}
        }
        var G = W + "?_snmk=" + I + "&_snme=" + R + "&_type=" + T + "&_cId=" + D + "&_sid=" + H + "&urlPattern=" + P + "&vid=" + E + "&lu=" + B + "&sid=" + L + "&mid=" + S + "&ls=" + C;
        v(G)
    }
    //-------------------------u----------------
    function u() {
        var k = new Date(),
            j = Math.round(100000 * Math.random()),
            x = k.getTime().toString().concat(j);
        return x
    }
    //-----------------n-------------
    function n(k) {
        var j = document.cookie.split("; ");
        for (var x = 0; x < j.length; x++) {
            var y = j[x].split("=");
            if (y[0] == k) {
                return unescape(y[1])
            }
        }
    }
//--------------------v--------------------
    function v(j) {
        var x = "log_" + (new Date()).getTime();
        var k = window[x] = new Image();
        k.onload = (k.onerror = function() {
            window[x] = null
        });
        k.src = j + "&iId=" + x;
        k = null
    }
    //-----------------------h------------------
    function h() {
        if (t.test(s)) {

            return "click.suning.cn/sa"
        } else {
            return "clicksit.suning.cn/sa"
        }
    }

    function d() {
        return document.domain
    }
   //--------------------h----------
    function i(k, j, C, B, A) {
        var z = k + "=" + escape(j);
        if (B != "") {
            var y = new Date();
            y.setTime(y.getTime() + B);
            z += ";expires=" + y.toGMTString()
        }
        if (C != "") {
            z += ";path=" + C
        }
        var x = d();
        if (x.indexOf(".suning.com") != -1) {
            z += ";domain=.suning.com"
        } else {
            if (x.indexOf(".cnsuning.com") != -1) {
                z += ";domain=.cnsuning.com"
            } else {
                z += ";domain=" + A
            }
        }
        document.cookie = z
    }

    function w(k) {
        var j = "-";
        if (!a(k)) {
            j = f(k, "tid", "&")
        }
        return j
    }
    ///--------------------------------------p-------------
    function p(j) {
        if (j.length > 301) {
            j = j.substring(0, 300)
        }

        while (j.indexOf(b) != -1) { //判断字符串是否存在 |， 有就换成 --
            j = j.replace(b, "--")
        }
        return j
    }

    function e(x, k) {
        if (x.nodeType == 3) {
            k.push(x.nodeValue)
        } else {
            if (x.nodeType == 1) {
                for (var j = x.firstChild; j != null; j = j.nextSibling) {
                    e(j, k)
                }
            }
        }
    }

    function l(j) { //编码
        return j != null ? encodeURIComponent(j) : ""
    }

    function f(x, k, A) {
        var z = "-",
            j;
        if (!a(x) && !a(k) && !a(A)) {
            j = x.indexOf(k);
            if (j > -1) {
                var y = x.indexOf(A, j);
                if (y < 0) {
                    y = x.length
                }
                z = x.substring(j + k.length + 1, y)
            }
        }
        return z
    }

    function a(j) {
        return (undefined == j || "" == j || "-" == j)
    }
    var r = sa.click;
    r.sendDatasIndex = q
})();
