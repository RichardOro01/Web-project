export function getCookie(name:string) {
    var nameEQ = name + "=";
    if (typeof window !== 'undefined') {
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
    }
  
    return null;
  }
  
  export function setCookie(name:string, value:string|undefined, days:number, expires:string) {
    var expires = "";
    if (days && !expires) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    if(expires) expires = "; expires=" + expires;
  
    if (typeof window !== 'undefined')
        window.document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  export function deleteCookie(name:string) {
    setCookie(name, "", -1,'');
  }