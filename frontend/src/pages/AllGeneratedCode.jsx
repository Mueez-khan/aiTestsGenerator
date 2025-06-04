import { useState, useEffect } from 'react'
import axios from "axios"
import { Heart } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'

export default function GeneratedCode() {
  const navigate  = useNavigate()
  const [data, setData] = useState([])
  const [favorites, setFavorites] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fullPost = (id) =>{
    navigate(`/singlePost/${id}`)
  }

  const fetchAllGeneratedImages = async () => {
    try {
      setIsLoading(true)

      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3000/api/v1/allGeneratedStories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response)
      setData(response.data.data)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching images", err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllGeneratedImages()
  }, [])

  const addToFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token")

      if (favorites[id]) {
        console.log("ID in adtofav" , id)
        await axios.post("http://localhost:3000/api/v1/removeFromFavorite", {
          id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFavorites((pre) => ({ ...pre, [id]: false }))
      } else {
        await axios.post("http://localhost:3000/api/v1/addToFavorite", {
           id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFavorites((pre) => ({ ...pre, [id]: true }))
      }
    } catch (err) {
      console.error("Error toggling favorite", err)
    }
  }

  const checkSavedStatus = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`http://localhost:3000/api/v1/isSaved/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFavorites((pre) => ({ ...pre, [id]: res.data.success }))
    } catch (err) {
      console.error("Error checking saved status", err)
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((image) => {
        checkSavedStatus(image._id)
      })
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container  mx-auto px-4 py-8">
      {data.length >= 0 ? (
        <div className="columns-2  sm:columns-3 md:columns-4 lg:columns-5 gap-6 space-y-6 ">
          {data.map((image) => (
            <div 
              key={image._id} 
              className="relative h-[300px] group break-inside-avoid rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute  top-2 right-2 z-10" >
                <button 
                  onClick={() => addToFavorite(image._id)}
                  className="bg-white/50 hover:bg-white/75 rounded-full p-2 transition-all duration-300"
                >
                  {favorites[image._id] ? (
                    <Heart fill="red" color="red" className="w-6 h-6" />
                  ) : (
                    <Heart color="white" className="w-6 h-6" />
                  )}
                </button>
              </div>
              <div className='cursor-pointer text-white' onClick={() => fullPost(image._id)}>
               
                <Markdown >{image.generatedCode}</Markdown>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500">No Code  Found</p>
          <p className="text-gray-400 mt-2">Generate some Code to get started!</p>
        </div>
      )}
    </div>
  )
}