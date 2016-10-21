// todo: add support for uppercase */

function rot13(letter) {
    var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                 'n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    var index = alpha.indexOf(letter);
    
    // ternary operator assignment ensures we don't go out of bounds
    var offset = index >= alpha.length / 2 ? -13 : 13;

    if (index >= 0) {
        return alpha[index + offset];
    }
    else {
        return letter;
    }
}

function main() {
    var input = document.forms["myForm"].elements["rot"].value.toLowerCase();
    var output = "";
    
    // perform rot13 for each letter of the input string
    for (var i = 0; i < input.length; i++) {
        output += rot13(input[i]);
    }
    
    document.getElementById('output').innerHTML = output;
}