import React, { useEffect, useState } from 'react'
import rehypeRaw from 'rehype-raw';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SingleStory() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const id = useParams();

  const fetchSinglePost = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/v1/singleStory/${id.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching story", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  return (
    <div className="container py-[30px] px-[100px] ">
      {loading ? (
        <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-screen'>
          <ClipLoader color="#a855f7" size={150} aria-label="Loading Spinner" />
        </div>
      ) : (
        <div className='text-white w-[1000px] markdown-container'>
          <p className='font-bold text-[20px] mb-7 flex items-center gap-[10px]'>
            <i className='mt-20'></i> 
            Code:
          </p>

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
            {data.generatedCode}
          </Markdown>
        </div>
      )}
    </div>
  );
}
