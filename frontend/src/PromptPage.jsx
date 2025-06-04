import {useState} from 'react'
import axios from "axios";
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';

export default function PromptPage() {

    const [prompt , setPrompt] = useState("");
    const [loading , setLoading] = useState(false);
    const [generatedPost , setGeneratedPost] = useState()

    console.log(prompt)

    const sendPrompt = async (e) =>{
    
        e.preventDefault()

        try{
            const token = localStorage.getItem("token");
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/api/v1/generateStory` , {
                prompt : prompt
            } , {
                headers: {
            Authorization: `Bearer ${token}`,
          },
            })

    
            setGeneratedPost(response.data.data.candidates[0].content.parts[0].text)
            setLoading(false)
            
        }catch(err){
            console.log("Error " , err)
            setLoading(false)
        }

    }

  return (
    <div className=' bg-gray-600 rounded-lg mt-4 p-4 flex flex-col items-center '>
      <h1 className=" text-2xl text-white  font-bold ">Generate Test Case and improve code quality</h1>
    <form className='p-4'>
        
        <input 
            type='text'
            placeholder='Enter your prompt'
            name='prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className=" m-2 w-40 md:w-96 h-8 rounded-sm "
        />

        <button onClick={sendPrompt} type='submit' className='bg-blue-600 m-2 w-40 h-8 text-white rounded-md'>
        {loading ? "Generating..." :    "Generate Cases"}
        
        </button>

    </form>

    {
        
        <div className='text-white'>
        <Markdown
          rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800 text-purple-300 px-1 rounded" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {generatedPost}
          </Markdown>
          </div>
    }
      
    </div>
  )
}
