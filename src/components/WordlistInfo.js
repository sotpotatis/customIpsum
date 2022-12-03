/* WordlistInfo.js
Contains and displays human-readable information about a word list.
Used in the application to explain what a current word list is about. */
import {wordLists} from "../code/words";

export default function WordlistInfo(props){
    const wordset = wordLists[props.wordset] // Get wordset metadata from name
    const title = wordset.title
    const description = wordset.description
    return <div key="wordsetInfo" id="wordsetInfo">
        <h3 className="text-xl font-bold">{title}</h3>
        <p>{description}</p>
    </div>
}