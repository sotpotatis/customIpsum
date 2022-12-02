/* WordlistInfo.js
Contains and displays human-readable information about a word list. */
import {wordLists} from "../code/words";

export default function WordlistInfo(props){
    const wordset = wordLists[props.wordset] // Get wordset metadata from name
    const title = wordset.title
    const description = wordset.description
    return <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p>{description}</p>
    </div>
}