import { useState, useEffect } from 'react'

import { storage, database } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { collection, getDocs, query, where } from "firebase/firestore";

import Spinner from '../components/Spinner'
import PostGallery from '../components/PostGallery';
import { useSearch } from '../context/Search';

const Loading = () => (
  <div className='h-full flex justify-center items-center'>
    <Spinner />
  </div>
)

const Home = () => {

  const {search} = useSearch()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchURL = async (id) => {
    const postRef = ref(storage, 'images/'+id)
    return await getDownloadURL(postRef)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setPosts([])
      const ref = collection(database, 'posts')
      const condition = search ? query(ref, where('tags', 'array-contains', search)) : ref 
      const response = await getDocs(condition)
      console.log(response.size);
      if (!response.size) return setLoading(false)
      response.forEach(async post => {
        const url = await fetchURL(post.id)
        setPosts(prev => {
          if (prev.length && prev.find(i => i.url === url)) return [...prev]
          else return [...prev, {...post.data(), url: url, id: post.id}]
        })
      })
      setLoading(false)
    }
    fetchPosts()
  }, [search])
  

  return loading ? <Loading /> : <PostGallery posts={posts} />
}

export default Home