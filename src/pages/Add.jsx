import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/Auth'

import { storage, database } from "../firebase"
import { ref, uploadBytes } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"; 

import { v4 } from "uuid"
import dayjs from "dayjs"
import {HiPlus} from 'react-icons/hi'
import {IoClose} from 'react-icons/io5'
import Spinner from '../components/Spinner'

const Add = () => {
  
  const navigate = useNavigate()
  const {currentUser} = useAuth()

  const [tags, setTags] = useState([])
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const title = useRef(null)
  const tagRef = useRef(null)
  
  const addTag = (tag) => setTags([...tags, tag])
  const deleteTag = (tag) => setTags(tags.filter(t => t !== tag))
  const submitTag = (event) => {
    event.preventDefault()
    const tag = tagRef.current.value
    if (tags.includes(tag) || !tag ) return
    addTag(tag.toLowerCase())
    tagRef.current.value = ''
  }


  useEffect(() => {
    if (!image) return setPreview(null)
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const upload = async (e) => {
    e.preventDefault()
    if (!image || !title) return
    setLoading(true)
    const id = v4()
    const imageRef = ref(storage, 'images/' + id)
    await uploadBytes(imageRef, image)
    await setDoc(doc(database, "posts", id), {
      user: currentUser.displayName,
      title: title.current.value,
      time: dayjs().format(),
      likes: [currentUser.displayName],
      tags: tags
      
    });

    setLoading(false)
    // alert('Image uploaded')
    navigate('/', {replace: true})
  }

  return (
    <div className="flex flex-row justify-center items-center h-full p-3">
      <div className="flex flex-col items-center justify-center md:flex-row md:items-start gap-4 max-w-4xl">

        {/* Image */}
        { image && <img src={preview} className='w-full sm:w-1/2 h-auto object-cover rounded-md' alt="Preview" />}

        {/* Details */}
        <div className="flex-1 flex flex-col gap-3 w-full">
          {/* Input Upload */}
          <form onSubmit={upload} className="flex flex-row justify-center items-center">
            <input type="file" onChange={event => setImage(event.target.files[0])} className='block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-100'/>
            {image && loading ? 
              <Spinner className='text-teal-600' />
              : <button className="py-2 px-4 rounded-full bg-teal-600 text-white font-semibold" type="submit">Upload</button>
            }
          </form>

          {/* Description */}
          { image && (<>
          <input type="text" required ref={title} placeholder='Description' disabled={loading} className="px-5 py-2 text-xl bg-zinc-100 rounded-full" />

          {/* Tags */}
          <div className="flex flex-col gap-5 flex-1" >

            {/* Tag Input */}
            <form onSubmit={submitTag} className="flex items-center justify-center">
              <input type="text" ref={tagRef} placeholder='Tags (optional)' disabled={loading} className="flex-1 px-5 py-2 bg-zinc-100 lowercase rounded-l-full" />
              <button type="submit" disabled={loading} className="px-3 py-2 bg-zinc-400 text-white rounded-r-full flex justify-center items-center"><HiPlus className="" /> Add</button>
            </form> 

            {/* Tags Map */}
            {tags.length > 0 ? (
            <div className="flex flex-row gap-3 items-center flex-wrap px-3 ">
              {tags.map(tag => 
                <div key={tag} className='flex h-7 items-center justify-between text-black bg-zinc-200 rounded-full'>
                  <div className="px-2"><span className="text-gray-500">#</span>{tag}</div> 
                  <button onClick={() => deleteTag(tag)}><IoClose className="bg-gray-300 w-7 h-auto p-1 rounded-full" /></button>
                </div> 
              )}
            </div>
            ): <div className="text-zinc-500 px-2">We recommend to apply tags. Your post will be more accessible in search results</div> }
          </div>

          </>)}
        </div>

      </div>
    </div>
  )
}

export default Add