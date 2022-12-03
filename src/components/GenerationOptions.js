/* GenerationOptions.js
Controls settings related to the generation of ipsum. */
import {wordLists} from "../code/words";
import WordlistInfo from "./WordlistInfo";
import {useState} from "react";

export default function GenerationOptions(props){
    const [optionState, setOptionState] = useState(false) // Little hack to force rerender of content on update
    /**
     * Sets an option using the parent's provided state setOptions function.
     * @param optionName The option name to change.
     * @param event The event data from the event that was triggered by it.
     */
    function setOption(optionName, event){
        let newOptions = props.options
        if (event.target.tagName.toLowerCase() === "input"){ // do not ask me why this is uppercase sometimes...
            if (event.target.type === "checkbox"){
                newOptions[optionName] = event.target.checked
            }
            else {
                newOptions[optionName] = event.target.value
            }
        }
        else {
          newOptions[optionName] = event.target.selectedOptions[0].value
        }
        console.log(newOptions[optionName])
        props.setOptions(newOptions)
        setOptionState(!optionState)
    }
    // Generate options based on available wordsets
    let wordsetOptions = []
    for (const [wordsetId, wordsetMetadata] of Object.entries(wordLists)){
        wordsetOptions.push(
            <option value={wordsetId}>{wordsetMetadata.title}</option>
        )
    }
    return (<div key="generationOptionsView" id="generationOptionsView">
            <div key="generationOptionsWrapper" id="generationOptionsWrapper" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div key="generationOptions" id="generationOptions" className="max-w-min">
                <p key="wordsetLabelWrapper"><label className="label" htmlFor="wordSetOptions">Wordset</label></p>
                <select key="wordsetOptionsSelect" className="forminput" id="wordSetOptions" defaultValue={props.options.wordset} onChange={(event)=>{setOption("wordset", event)}}>
                        {wordsetOptions}
                </select>
            </div>
                <WordlistInfo wordset={props.options.wordset}/>
            </div>
            <p key="paragraphOptionsLabelWrapper"><label className="label" htmlFor="paragraphOptions">Number of paragraphs</label></p>
            <input key="paragraphOptions" type="number" min={1} className="forminput" id="paragraphOptions" defaultValue={props.options.paragraphs} onChange={(event)=>{setOption("paragraphs", event)}}/>
            <p key="startWithIpsumOption"><input type="checkbox" className="forminput" id="startWithIpsum" defaultChecked={props.options.startWithIpsum} onChange={(event)=>{setOption("startWithIpsum", event)}}/><label className="pl-3" htmlFor="startWithIpsum">Start with "...ipsum dolor sit amet..."</label></p>
    </div>
   )
}