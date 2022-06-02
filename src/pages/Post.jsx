import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore"
import { database, storage } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import dayjs from 'dayjs'
import Likes from '../components/Likes'

const Post = () => {

  const {id} = useParams()
  const [data, setData] = useState()
  const navigate = useNavigate()

  const fetchURL = async (id) => {
    const postRef = ref(storage, 'images/'+id)
    return await getDownloadURL(postRef)
  }

  useEffect(() => {
    if(!id) return
    const fetchData = async () => {
      const docSnap = await getDoc(doc(database, 'posts', id))
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const url = await fetchURL(id)
        setData({...docSnap.data(), url: url})
      } else {
        // doc.data() will be undefined in this case
        navigate('/404', {replace: true})
        console.log("No such document!");
      }
    }
    fetchData()
  }, [])

  return data ? (
    <div className='flex justify-center items-center h-full py-4'>
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <div className="md:flex">

        <div className="md:shrink-0 basis-1/2">
          <img className="object-cover h-full w-full md:h-auto" src={data.url} alt="" />
        </div>

        <div className="p-4 w-full flex flex-col justify-between">
          <div>
            <div className='text-2xl lg:text-3xl'>{data.title}</div>
            <div>Uploaded by <span className='font-semibold text-teal-500'>{data.user}</span></div>
          </div>
    
          <div className='w-full flex justify-between items-center'>
            <div className='text-slate-400 text-lg'>{dayjs(data.time).format('DD-MM-YYYY')}</div>
            <Likes className='shadow-xl' likes={data.likes} />
          </div>
          {/* <div className='tracking-wide text-slate-400'>{dayjs(data.time).format('DD/MM/YYYY')}</div> */}
          {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div> */}
          {/* <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a> */}
          {/* <p className="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p> */}
        </div>

      </div>
    </div>
    </div>
  ) : <div>Spinner</div>
    
}

export default Post