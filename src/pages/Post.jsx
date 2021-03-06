import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '../context/Auth'
import { database, storage } from '../firebase'
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import { getDownloadURL, ref } from 'firebase/storage'

import dayjs from 'dayjs'

import Likes from '../components/Likes'
import Spinner from '../components/Spinner'
import {RiEditLine} from 'react-icons/ri'
import {FiDelete} from 'react-icons/fi'

const Post = () => {

  const {id} = useParams()
  const {currentUser} = useAuth()
  const [data, setData] = useState()
  const [edit, setEdit] = useState(false)
  const editRef = useRef()
  const navigate = useNavigate()

  const editPost = async (event) => {
    event.preventDefault()
    if(currentUser.displayName !== data.user) return
    try {
      const postRef = doc(database, 'posts', id)
      await setDoc(postRef, {title: editRef.current.value}, { merge: true })
      setData({...data, title: editRef.current.value})
      setEdit(false)
    } catch (error) {
      alert(error)
    }
  }

  const deletePost = async () => {
    if(currentUser.displayName !== data.user) return
    await deleteDoc(doc(database, "posts", id));
    navigate('/', {replace: true})
  }

  const fetchURL = async (id) => {
    const postRef = ref(storage, 'images/'+id)
    return await getDownloadURL(postRef)
  }

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(database, 'posts', id))
      if (!docSnap.exists()) return navigate('/404', {replace: true})
      const url = await fetchURL(id)
      setData({...docSnap.data(), url: url})
    }

    if(!id) return
    fetchData()
  }, [id, navigate])

  return (
    <div className='flex justify-center items-center h-full py-4'>
      { data ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <div className="md:flex">

            <div className="md:shrink-0 basis-1/2">
              <img className="object-cover h-full w-full md:h-auto" src={data.url} alt="" />
            </div>

            <div className="p-4 w-full flex flex-col justify-between">
              <div>
                <form onSubmit={editPost} className="flex flex-row items-center justify-between">
                  { edit ? <input type="text" ref={editRef} className='text-2xl lg:text-3xl w-56' /> : <div className='text-2xl lg:text-3xl'>{data.title}</div>}
                  { currentUser.displayName === data.user && (<div className='flex flex-row items-center text-xl gap-4'>
                    <RiEditLine onClick={() => setEdit(!edit)} className={`${edit ? 'text-teal-600':'text-black'} cursor-pointer`} />
                    <FiDelete onClick={deletePost} className='text-red-500 cursor-pointer' />
                  </div>)}
                </form>
                <div>Uploaded by <Link to={'/u/'+data.user} className='font-semibold text-teal-500'>{data.user}</Link></div>
              
              { data.tags && (
                <div className='flex flex-row gap-3 items-center flex-wrap my-3'>
                  {data.tags.map(tag => (<div className='bg-zinc-100 px-3 py-1 rounded-full' key={tag}>#{tag}</div>))}
                </div>
              )}

              </div>

        
              <div className='w-full flex justify-between items-center'>
                <div className='text-slate-400 text-lg'>{dayjs(data.time).format('DD-MM-YYYY')}</div>
                <Likes className='shadow-xl' id={id} />
              </div>

            </div>

          </div>
        </div> 
      ): <Spinner />  }
    </div>
  )
}

export default Post