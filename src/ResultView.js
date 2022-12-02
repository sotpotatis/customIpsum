import {Icon} from "@iconify/react";

export default function ResultView(props){
let paragraphsHTML = []
    for (const paragraph of props.generatedContent){
      paragraphsHTML.push(<p>{paragraph}<br/><br/></p>)
    }
    return [
    <p className="text-blue-600"><button className="flex flex-row bg-white border-0 outline-0 hover:cursor-pointer" onClick={props.goBack}><Icon icon="mdi:arrow-left-thin" inline={true}/> Go back</button></p>,
    <div className="bg-gray-700 p-3 overflow-scroll text-white rounded-lg border-gray-200 border-2 select-all hover:cursor-pointer">
        {paragraphsHTML}
    </div>]
}