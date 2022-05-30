import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Btn from "../components/Btn"

import { storage, database } from "../firebase"
import { ref, uploadBytes } from "firebase/storage"
// import { ref as dataRef, set } from "firebase/database";
import { v4 } from "uuid"
import useAuth from '../context/Auth'

import { doc, setDoc } from "firebase/firestore"; 
import dayjs from "dayjs"

const Add = () => {
  
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  const title = useRef(null)


  useEffect(() => {
    if (!image) return setPreview(null)
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const upload = async () => {
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
      }
    });

    setLoading(false)
    alert('Image uploaded')
    navigate('/', {replace: true})
  }

  // const upload = async () => {
  //   if (!image || !title) return
  //   setLoading(true)
  //   const id = v4()
  //   const imageRef = ref(storage, 'images/' + id)
  //   await uploadBytes(imageRef, image)
  //   await set(dataRef(database, `${currentUser.displayName}/posts`), {[id]: true})
  //   await set(dataRef(database, `posts/${id}`), {title: title.current.value, user: currentUser.displayName})
  //   setLoading(false)
  //   alert('Image uploaded')
  //   navigate('/', {replace: true})
  // }
  
  // const test = async () => {
  //   await set(dataRef(database, currentUser.displayName + '123'), {name: 'test'})
  // }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      { image && <img src={preview} className='w-80 h-80 object-contain' alt="Preview" />}
      <div className="flex flex-row justify-center items-center">
        <input type="file" onChange={event => setImage(event.target.files[0])}/>
        {image && !loading && <Btn onClick={upload}>Upload</Btn>}
      </div>

      <input type="text" ref={title} placeholder='title' />
      {/* {title.target.value} */}
      {/* <button onClick={test}>Test</button> */}

    </div>
  )
}

export default Add