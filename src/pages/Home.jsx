import { useState, useEffect } from 'react'

import { storage, database } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { collection, getDocs, limit, query, where } from "firebase/firestore";

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
  const [cap, setCap] = useState(9)
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
      const condition = search ? query(ref, where('tags', 'array-contains', search)) : query(ref, limit(cap))
      const response = await getDocs(condition)
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
  }, [search, cap])
  

  return loading ? <Loading /> : (<>
    <PostGallery posts={posts} />
    { posts && posts.length === cap  && (
      <div className='flex justify-center items-center my-10'>
        <button onClick={() => setCap(cap+10)} className='border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded-full px-4 py-1'>Show more</button>
      </div>
    )}
  </>)
}

export default Home