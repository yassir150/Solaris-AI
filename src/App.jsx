import { useState } from "react";
import ReactMarkdown from "react-markdown";


const App= ()=> {
  const [error, setError] = useState("something went wrong");
  const [value, setValue] = useState("");
  const [chatanswer, setChatanswer] = useState("");


  const getResponse = async () =>{
    setChatanswer("")
    if(!value){
      setError("please enter a question");
      return;
    }

    try{ 
      const options ={
        method :"POST",
        body : JSON.stringify({
          answer : chatanswer,
          message : value
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }
      const responce = await fetch('http://localhost:8000/gemini',options)
      const data = await responce.text(); 
      console.log(data);
      setChatanswer(data);
      setValue("");
     }catch(error){
      setError(error.message);
      return;
    }
  }


  return (
    <div className='app'>
        <div className='input-container'>
          <input type="text" value={value} placeholder='ask me a question' onChange={(e)=> setValue(e.target.value)}/>
          {<button onClick={getResponse}>ask</button>}
        </div>
        {!error && <p>{error}</p>}
        {chatanswer &&<div className="result">
          <div>
            <p className="answer"><ReactMarkdown>{chatanswer}</ReactMarkdown></p>
          </div>
        </div>}
    </div>
  )
}

export default App
