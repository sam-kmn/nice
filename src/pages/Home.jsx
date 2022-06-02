import { useState, useEffect } from 'react'

import { storage, database } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { collection, getDocs } from "firebase/firestore";

import Spinner from '../components/Spinner'
import PostGallery from '../components/PostGallery';

const Loading = () => (
  <div className='h-full flex justify-center items-center'>
    <Spinner />
  </div>
)

const Home = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
    fetchPosts()
  }, [])
  

  return loading ? <Loading /> : <PostGallery posts={posts} />
}

export default Home