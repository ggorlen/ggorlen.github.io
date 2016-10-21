/*function rot13() {
    //var input = (typeof input === 'undefined') ? process.argv[process.argv.length - 1] : "hello world";

    var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                 'n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    var input = process.argv[process.argv.length - 1];
    var s = "";
    
    for (var i = 0; i < input.length; i++) {
        var index = alpha.indexOf(input[i]);
        var offset = 13;
        
        if (index >= alpha.length / 2) {
            offset = -13;
        }

        if (index >= 0) {
            s += alpha[index + offset];
        }
        else {
            s += input[i];
        }
    }
    return s;
}*/

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
    if (process.argv.length < 3) {
        console.log("Usage: node rot13.js [string to rotate]")
    }
    else {
        //var input = (typeof input === 'undefined') ? process.argv[process.argv.length - 1] : "hello world";

        var input = process.argv[process.argv.length - 1];
        var s = "";
        
        for (var i = 0; i < input.length; i++) {
            s += rot13(input[i]);
        }
        console.log(s);
    }     
}

main();