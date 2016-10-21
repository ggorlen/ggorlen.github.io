function rot13(letter) {
    var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                 'n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    var index = alpha.indexOf(letter);
    var offset = index >= alpha.length / 2 ? -13 : 13;

    if (index >= 0) {
        return alpha[index + offset];
    }
    else {
        return letter;
    }
}

function main() {
    var input = document.forms["myForm"].elements["rot"].value;
    var s = "";
    
    for (var i = 0; i < input.length; i++) {
        s += rot13(input[i]);
    }
    console.log(s);
    document.getElementById('output').innerHTML = s;
}