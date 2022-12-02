/* GenerationOptions.js
Controls settings related to the generation of ipsum. */
import {wordLists} from "../code/words";
import WordlistInfo from "./WordlistInfo";
export default function GenerationOptions(props){
    function setOption(optionName, event){
        let newOptions = props.options
        if (event.target.tagName === "input"){
            newOptions[optionName] = event.target.valueOf()
        }
        else {
          newOptions[optionName] = event.target.selectedOptions[0].value
        }
        props.setOptions(newOptions)
    }
    let wordsetOptions = []
    for (const [wordsetId, wordsetMetadata] of Object.entries(wordLists)){
        wordsetOptions.push(
            <option value={wordsetId}>{wordsetMetadata.title}</option>
        )
    }
    return (<div key="generationOptions">
            <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="max-w-min">
                <p><label className="label" htmlFor="wordSetOptions">Wordset</label></p>
            <select className="forminput" id="wordSetOptions" defaultValue={props.options.wordset} onChange={(event)=>{setOption("wordset", event)}}>
                    {wordsetOptions}
            </select>
            </div>
            <WordlistInfo wordset={props.options.wordset}/>
            </div>
            <p><label className="label" htmlFor="paragraphOptions">Number of paragraphs</label></p>
            <input type="number" min={1} className="forminput" id="paragraphOptions" defaultValue={props.options.paragraphs} onChange={(event)=>{setOption("paragraphs", event)}}/>
    </div>)
}