import GenerationOptions from "./components/GenerationOptions";
export default function GenerationView(props){
    return [
        <GenerationOptions options={props.options} setOptions={props.setOptions}/>,
        <button type="submit" className="bg-blue-400 max-w-min ring-2 ring-blue-500 px-3 py-2 text-white font-bold rounded mt-4" onClick={props.generateContent}>Generate</button>
    ]
}