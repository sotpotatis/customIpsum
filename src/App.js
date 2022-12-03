import './App.css';
import {useState} from "react";
import {generateIpsum, wordLists} from "./code/words";
import GenerationView from "./GenerationView";
import ResultView from "./ResultView";

function App() {
  const [options, setOptions] = useState({wordset: Object.keys(wordLists)[0], paragraphs: 2, startWithIpsum: true})
  const [generatedContent, setGeneratedContent] = useState(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  /**
   * Generates ipsum based on options set on the page.
   */
  function generateContent(){
    const currentWordset = wordLists[options.wordset]
    const ipsumStart = options.startWithIpsum === true ? currentWordset.ipsumPrefix : null // Add ipsum start if any
    setGeneratedContent(generateIpsum(currentWordset.wordsList, options.paragraphs, ipsumStart))
    setHasGenerated(true)
  }

  // Set main content according to current status
  let mainContent = null
  if (!hasGenerated){
    mainContent = <GenerationView wordset={options.wordset} options={options} setOptions={setOptions} generateContent={generateContent}/>
  }
  else {
    mainContent = <ResultView generatedContent={generatedContent} goBack={()=>{setGeneratedContent(null);setHasGenerated(false);}}/>
  }
  return <div key="mainWindow" className="h-screen bg-blue-100 flex flex-row justify-center align-center">
    <div key="mainContent" className="px-6 py-6 mx-6 my-6 flex flex-col place-content-center gap-y-6 basis-3/4 max-h-full overflow-scroll bg-white rounded-lg border-2 border-gray-100">
      <h1 className="text-[5em] font-bold text-blue-500">ipsum.</h1>
      <h2 className="text-xl font-gray-800">generate filler texts!</h2>
      {mainContent}
    </div>
  </div>
}

export default App;
