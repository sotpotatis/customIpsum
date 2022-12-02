import {systemWords} from "./wordLists/systemWords";
import {webdevWords} from "./wordLists/webdevWords";

export const wordLists = {
    systemTheory: {
        wordsList: systemWords,
        title: "system theory",
        description: "various words related to system theory (VSM, GST) and other system-analysis related words."
    },
    webdev: {
        wordsList: webdevWords,
        title: "webdev",
        description: "various words related to web development and web development tools."
    }
}

function randomizeFromArray(array){
    return array[Math.floor(Math.random() *array.length)]
}

function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min)+min)
}

const endingPunctuation = ["!", "?", "."]
const delimiters = [{
    requiresClose: true,
    beforeWord: true,
    openingChar: "(",
    closingChar: ")"
},
{
    requiresClose: false,
    beforeWord: false,
    openingChar: ",",
    closingChar: null
}]
let allPunctuation = endingPunctuation
for (let delimiter of delimiters){
    allPunctuation.concat([delimiter.openingChar, delimiter.closingChar].filter(val=>val!=null))
}

const noDelimiter = { // Variable to use when do delimiter is active
    requiresClose: false,
    beforeWord: null,
    openingChar: null,
    closingChar: null
}
export function generateIpsum(words, numberOfParagraphs){
    let previousWord = null
    let content = []
    for (let paragraphNumber=0;paragraphNumber<numberOfParagraphs;paragraphNumber++){
        let numberOfSentences = randomNumber(5,10)
        let paragraph = ""
        let currentSentenceNumber = 0
        let currentSentence = null
        console.log(`Generating ${numberOfSentences} sentences...`)
        while (currentSentenceNumber<numberOfSentences){
            currentSentence = null
            let currentSentenceLength = 0
            let currentSentenceWantedWordCount = randomNumber(3, 15)
            let currentDelimiter = noDelimiter // Used to track parentheses
            console.log(`Generating a sentence with ${currentSentenceWantedWordCount} words.`)
            while (currentSentenceLength<currentSentenceWantedWordCount) {
                // Avoid number being generated twice
                let word = null
                while (true) {
                    word = randomizeFromArray(words)
                    if (word !== previousWord) {
                        break
                    }
                }
                previousWord = word
                // Generate sentence
                if (currentSentence === null) {
                    word = word[0].toUpperCase() + word.slice(1,word.length)
                    currentSentence = word + " "
                } else {
                    const isEndOfSentence = (currentSentenceLength + 1 === currentSentenceWantedWordCount)
                    if (randomNumber(1, 2) === 1 &&!isEndOfSentence && !allPunctuation.includes(currentSentence.slice(-2,-1))) { // Add some funny punctuation
                            if (currentDelimiter.requiresClose) {
                                word += currentDelimiter.closingChar
                                currentDelimiter = noDelimiter
                            } else {
                                currentDelimiter = randomizeFromArray(delimiters)
                                if (currentDelimiter.beforeWord) {
                                    word = currentDelimiter.openingChar + word
                                } else {
                                    word += currentDelimiter.openingChar
                                }
                            }

                    }
                    else if (isEndOfSentence) { // End sentence
                        if (currentDelimiter.requiresClose) {
                            word += currentDelimiter.closingChar
                        }
                        word += randomizeFromArray(endingPunctuation)
                    }
                    currentSentence += word + " "
                }
                currentSentenceLength++
            }
            paragraph += currentSentence
            currentSentenceNumber++
        }
        content.push(paragraph)
    }
    return content
}