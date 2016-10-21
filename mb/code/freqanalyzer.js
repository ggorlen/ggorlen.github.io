function fAnalyze(words) {
    
    words = words.split(" ");
    
    var hist = {};
    
    for (var i = 0; i < words.length; i++) {
        if (words[i] in hist) {
            hist[words[i]]++;
        }
        else {
            hist[words[i]] = 1;
        }
    }
    return hist;   
}

function main() {
    var result = fAnalyze("hello, world");

    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            console.log(key + ": " + result[key]);
        }
    }
    
    // how can we sort the output?
}

main();