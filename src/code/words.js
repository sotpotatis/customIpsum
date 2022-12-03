import {organizationWords} from "./wordLists/organizationWords";
import {webdevWords} from "./wordLists/webdevWords";
import {menuWords} from "./wordLists/menuWords";

export const wordLists = {
    systemTheory: {
        wordsList: organizationWords,
        title: "organizational theory",
        ipsumPrefix: "Organization",
        description: "various words related to organization and system theory (VSM, GST) and other system-analysis related words."
    },
    webdev: {
        wordsList: webdevWords,
        title: "webdev",
        ipsumPrefix: "Webdev",
        description: "various words related to web development and web development tools."
    },
    lunch: {
        wordsList: menuWords,
        title: "lunch menu",
        ipsumPrefix: "Eatery",
        description: "words pulled from my own API for the lunch menu for Eatery Kista Nod. dataset: menus from week 48 (2022) and about 15 weeks back."
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

/**
 * Generates an ipsum-like text.
 * @param words A list of words to randomize from.
 * @param numberOfParagraphs A list of paragraphs to choose from.
 * @param ipsumStart A string to start the text with "{ipsumStart} ipsum dolor sit amet," null to not do it.
 * @returns {*[]} A list of paragraphs with generated ipsum text in them.
 */
export function generateIpsum(words, numberOfParagraphs, ipsumStart){
    let previousWord = null
    let content = []
    for (let paragraphNumber=0;paragraphNumber<numberOfParagraphs;paragraphNumber++){
        let numberOfSentences = randomNumber(5,10)
        let paragraph = ""
        let currentSentenceNumber = 0
        let currentSentence = null
        console.log(`Generating ${numberOfSentences} sentences...`)
        while (currentSentenceNumber<numberOfSentences){
            if (paragraphNumber === 0 && currentSentenceNumber === 0 && ipsumStart !== null){
                currentSentence = `${ipsumStart} ipsum dolor sit amet `
            }
            else {
                currentSentence = null
            }
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