import './App.css';
import {useState} from "react";
import {generateIpsum, wordLists} from "./code/words";
import GenerationView from "./GenerationView";
import ResultView from "./ResultView";
function App() {
  const [options, setOptions] = useState({wordset: Object.keys(wordLists)[0], paragraphs: 2})
  const [generatedContent, setGeneratedContent] = useState(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  /**
   * Generates ipsum based on options.
   */
  function generateContent(){
    setGeneratedContent(generateIpsum(wordLists[options.wordset].wordsList, options.paragraphs))
    setHasGenerated(true)
  }

  // Create main content
  let mainContent = null
  if (!hasGenerated){
    mainContent = <GenerationView options={options} setOptions={setOptions} generateContent={generateContent}/>
  }
  else {
    mainContent = <ResultView generatedContent={generatedContent} goBack={()=>{setGeneratedContent(null);setHasGenerated(false);}}/>
  }
  return <div className="h-screen bg-blue-100 flex flex-row justify-center align-center">
    <div className="px-6 py-6 mx-6 my-6 flex flex-col place-content-center gap-y-6 basis-3/4 max-h-full overflow-scroll bg-white rounded-lg border-2 border-gray-100">
      <h1 class="text-[5em] font-bold text-blue-500">ipsum.</h1>
      <h2 class="text-xl font-gray-800">generate filler texts!</h2>
      {mainContent}
    </div>
  </div>
}

export default App;
