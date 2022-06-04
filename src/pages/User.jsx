import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from '../context/Auth'

import { storage, database } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { collection, getDocs, query, where } from "firebase/firestore";

import Avatar from 'react-avatar'
import Spinner from '../components/Spinner'
import PostGallery from "../components/PostGallery";

const User = () => {

  const {uid} = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const {currentUser} = useAuth()

  const fetchURL = async (id) => {
    const postRef = ref(storage, 'images/'+id)
    return await getDownloadURL(postRef)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      console.count('fetchPosts', uid);
      const postsResponse = await getDocs(query(collection(database, 'posts'), where("user", '==', uid)))
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
    if (!uid) return
    fetchPosts()
  }, [uid])

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10 ">
      
      <Avatar name={currentUser.displayName} round={true} />
      <div className="text-4xl font-semibold">{uid}</div>

      { loading ? <Spinner className='text-teal-600' /> : (<>
        <div>Uploaded {posts.length} posts</div>
        <PostGallery posts={posts} />
      </>)}
      
    </div>
  )
}

export default User