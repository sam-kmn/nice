import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { storage, database } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { collection, getDocs } from "firebase/firestore";

import LikeIcon from '../components/Icons/Like'
import DislikeIcon from '../components/Icons/Dislike'

const Home = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => console.log(posts), [posts])

  const fetchURL = async (id) => {
    const postRef = ref(storage, 'images/'+id)
    return await getDownloadURL(postRef)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const postsResponse = await getDocs(collection(database, 'posts'))
      if (!postsResponse.size) return console.warn('no posts');
      postsResponse.forEach(async post => {
        const url = await fetchURL(post.id)
        setPosts(prev => {
          if (prev.length && prev.find(i => i.url === url)) return [...prev]
          else return [...prev, {...post.data(), url: url, id: post.id}]
        })
      })
    }
    fetchPosts()
  }, [])
  

  return (
    <div className='py-4 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-3'>
      {posts.length ? posts.map(post => 
        (<div key={post.id} className='relative group break-inside-avoid-column'>
          <Link to={'/i/'+post.id}>
            <img className='rounded-lg group-hover:brightness-50' src={post.url} alt='test' />
            <nav className='invisible group-hover:visible absolute inset-0 p-2 text-white flex flex-col justify-between'>
              <div className='text-lg font-semibold text-center'>{post.title}</div>
              <div className='flex justify-between items-center px-3 '>
                <div className='text-lg font-semibold'>@{post.user}</div>
                <div className='flex flex-row gap-3 justify-center items-center text-black bg-white px-4 py-2 rounded-full'>
                  10 <LikeIcon className={'hover:text-emerald-600 hover:scale-125 transition duration-200'} />
                  1 <DislikeIcon className={'hover:text-red-600 hover:scale-125 transition duration-200'} />
                </div>
              </div>
              
            </nav>
          </Link>
        </div>)) 
        : <div>No images</div>
      }
    </div>
  )
}

export default Home