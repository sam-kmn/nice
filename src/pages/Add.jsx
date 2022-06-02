import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from '../context/Auth'

import { storage, database } from "../firebase"
import { ref, uploadBytes } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"; 

import { v4 } from "uuid"
import dayjs from "dayjs"
import {HiPlus} from 'react-icons/hi'
import {IoClose} from 'react-icons/io5'

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
    if (!tags.includes(tagRef.current.value))
      return addTag(tagRef.current.value)
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
      // type: image.type.split('/')[1],
      likes: {
        [currentUser.displayName]: true
      },
      tags: tags
      
    });

    setLoading(false)
    alert('Image uploaded')
    navigate('/', {replace: true})
  }

  return (
    <form onSubmit={upload} className="flex flex-col justify-center items-center gap-4 mt-10">


      <div className="flex flex-row justify-center items-center">
        <input type="file" onChange={event => setImage(event.target.files[0])} className='block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-teal-50 file:text-teal-700
          hover:file:bg-teal-100'/>

        {image && !loading && <button className="py-2 px-4 rounded-full bg-teal-600 text-white font-semibold" type="submit">Upload</button>}
      </div>
      
      { image && <>
        <img src={preview} className='w-96 h-96 object-cover rounded-md' alt="Preview" />
        <input type="text" required ref={title} placeholder='Description' className="text-center text-xl" />
        <div className="flex flex-col gap-5 w-80">
          
          <div className="flex flex-row gap-3 items-center flex-wrap">
            {tags && tags.map(tag => 
              <div key={tag} className='flex h-7 items-center justify-between text-white bg-gray-500 rounded-full'>
                
                <div className="px-2"><span className="text-gray-400">#</span>{tag}</div> 
                
                <button onClick={() => deleteTag(tag)}><IoClose className="bg-gray-600 w-7 h-auto p-1 rounded-full" /></button>
              </div> )}
          </div>

          <div className="flex items-center justify-center ">
            <input type="text" ref={tagRef} placeholder='Tags (optional)' className="text-center  bg-zinc-100 rounded-l-full px-3 py-1" />
            <button onClick={submitTag} className="bg-teal-600 text-white rounded-r-full flex justify-center items-center px-3 py-1"><HiPlus className="" /> Add</button>
          </div> 

        </div>
      </>}

      <div className="text-center text-zinc-400 mt-10">Image preview aspect ratio is square only,<br />Your image will be uploaded with original aspect ratio</div>
    </form>
  )
}

export default Add