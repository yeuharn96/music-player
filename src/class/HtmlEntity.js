class HtmlEntity{
    static decode = (str) => {
        const e = document.createElement('div');
        e.innerHTML = str;
        return e.innerText;
    }

    static encode = (str) => {
        var buf = [];
        for (var i=str.length-1;i>=0;i--) {
          buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
      };
}

export default HtmlEntity;