const solutionInstance = require('./Kevin-Nguyen-solution.js');
const fs = require("fs");

const text = fs.readFileSync("./words");
const text2 = fs.readFileSync("./words2");

// method for turning newline separated text file into an array of keywords
function getKeywords(text) {
    let buffer = '';
    let words = [];
    let index = 0;
    while(index < text.length){
        let current = String.fromCharCode(text[index]);
        while(current != '\n' && index<text.length){
            buffer = buffer + current;
            index++;
            current = String.fromCharCode(text[index]);
        }
        words.push(buffer);
        buffer = '';
        index++;
    }
    return words;
}

const keywords = getKeywords(text);
const keywords2 = getKeywords(text2);
const url = 'https://www.google.com/search?source=hp&ei=GMsnXaaNF4T_0gK7npC4Aw&q=cherries+pricey+slip+damage&oq=cherries+pricey+slip+damage&gs_l=psy-ab.3...1947.11341..11557...1.0..0.299.2800.23j5j1....2..0....1..gws-wiz.....0..35i39j0j0i131j0i67j0i10j0i13j0i13i30j0i13i5i30j0i8i13i30j33i160j33i22i10i29i30j33i299j33i22i29i30.qeVmiTeuEXg';
let matches = solutionInstance.showMatches(url, keywords2);
console.log(matches);
matches = solutionInstance.showMatches(url, keywords);
console.log(matches);