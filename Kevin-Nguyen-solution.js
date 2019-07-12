// In this example, it is assumed the keywords are given as an array
// and I create a trie out of it for the purposes of my solution.
// I'll iterate through each character of the url and see if it registers in the trie.
// I'm assuming we want to be extra thorough and check for all possible keywords throughout the url; in case the end of a keyword is the prefix of another keyword.
// otherwise once a keyword is found, I would move long from that part of the url to look for more keywords which would be a little faster.

// Running example:
// test.js has a running example
// I included two files with random words to be used as keywords.
// words2 has 17 words and words has 2643.
// I tested it against a google search url that has keywords in it
// and logged the matched keywords onto the console.


// returns an array of objects that hold the matched word and the index it was found at
function showMatches(url, keywords) {
    let trie = createTrie(keywords);
    let matches = [];
    for(let i=0; i<url.length; i++) {
        let word = trie.checkWord(url, i);
        if(word === null){
            continue;
        }
        let match = {
            word:word,
            index: i
        }
        matches.push(match);
    }
    return matches;
}

// function used in showMatches that creates a trie of the keywords
function createTrie(keywords) {
    let trie = new Trie();
    keywords.forEach(keyword => {
        trie.addWord(keyword);
    });
    return trie;
}

// trie class that has the checkWord and addWord methods
class Trie {
    constructor() {
        this.root = new Node();
    }
    // checks if a word starting at index j of url exists in the trie and returns it
    checkWord(url, j) {
        let current = this.root;
        let i = j;
        let word = '';
        let words = [null];
        while(current!==null && i<url.length) {
            let index = current.findChildIndex(url[i]);
            // if letter isn't found in current level of trie, then word does not exist
            if(index === -1) {
                // return the latest word in words, will return null if no words were found
                return words[words.length-1];
            }
            current = current.children[index]; // set current to next node
            word = word + current.value; // keep building word with the next letter
            // if it is a completed word with no other possibilities, return that word
            if(current.flag === 1) {
                return word;
            }
            // if it is a completed word but may be a prefix to a bigger word, store it but move on
            if(current.flag === 2) {
                words.push(word);
            }
            i++;
        }
        // return the last word in the case that we reach the end of the url
        return words[words.length-1];
    }
    // adds a word to the trie
    addWord(word) {
        // starting at the root, see if any of the children are of the letter
        let current = this.root;
        // iterate through each letter, seeing if it is already there, if not then add it
        for(let i=0; i<word.length; i++) {
            // look for the index of the child with the value of the current letter of the word
            let index = current.findChildIndex(word[i]);
            // index will be -1 if there is no child with that letter
            if(index === -1) {
                // if there is no child with the current letter,
                // then add a child with that letter
                current.addChild(new Node(word[i]));
                // set index to that new child so the next iteration will look at it
                index = current.children.length - 1;
                // if this node is marked as the end of a word,
                // then mark it as both the end of a word and part of another word
                if(current.flag === 1){
                    current.flag = 2;
                }
            }
            // set current to the child with the current letter
            // so next iteration can check for the next letter
            current = current.children[index];
        }
        // if it's a new word, then set it as the end of a word
        // don't want to set flag to indicate end of word if it is set at both
        if(current.flag === 0){
            current.flag = 1;
        }
    }
}

// Node class that is used for the trie, has the addChild and findChildIndex methods
class Node {
    constructor() {
        this.value;
        if(arguments.length === 0) {
            this.value = null;
        }else{
            this.value = arguments[0];
        }
        this.children = [];
        this.flag = 0; // 0-not end of word, 1-end of word, 2-both
    }
    addChild(node) {
        this.children.push(node);
    }
    // returns index of child with value of character, -1 if no child with that value exists
    findChildIndex(character) {
        for(let i=0; i<this.children.length; i++){
            if(this.children[i].value === character){
                return i;
            }
        }
        return -1;
    }
}

module.exports = {showMatches};