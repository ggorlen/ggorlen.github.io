function fAnalyze(words) {
    
    // create an array from the string parameter, delimited by empty spaces
    words = words.split(" ");
    
    // create a histogram to count the frequency of each word
    var hist = {};
    
    for (var i = 0; i < words.length; i++) {
        if (words[i] in hist) {
            hist[words[i]]++; // increment the count for that word by one
        }
        else {
            hist[words[i]] = 1;
        }
    }
    return hist;   // return our histogram from the function
}

function main(input) {
    
    // we can change this string literal to input variable to get input from a user
    var result = fAnalyze(input);

    // enhanced for loop to print the result from the dictionary object
    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            console.log(key + ": " + result[key]);
        }
    }
    
    // how can we sort the output?
}

main("hello, world");
