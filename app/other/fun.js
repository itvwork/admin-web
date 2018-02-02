(function() {
    window.VukTook = {
        setSession(name, value) {
            if (typeof value == 'string') {
                sessionStorage.setItem(name, value);
            } else {
                sessionStorage.setItem(name, JSON.stringify(value));
            }
        },
        getSession(name) {
            let str = sessionStorage.getItem(name);
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return obj;
                    } else {
                        return false;
                    }
                } catch (e) {
                  
                    return str;
                }
            }
        },
        pushSession(name, arr) {
            let json = JSON.parse(sessionStorage.getItem(name));
            json.push(arr);
        }
    }
})()
