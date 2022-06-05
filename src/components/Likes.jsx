import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth'
import { database } from '../firebase'
import { doc, setDoc, onSnapshot} from "firebase/firestore";
import {RiHeartFill, RiHeartLine} from 'react-icons/ri'

const Likes = ({className, id}) => {

  const {currentUser} = useAuth()
  const [likes, setLikes] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(doc(database, "posts", id), doc => setLikes(doc.data().likes));
    return () => unsub()
  }, [id])

  const like = () => {
    if (!currentUser) return
    const postRef = doc(database, 'posts', id);
    
    if (likes.includes(currentUser.displayName)) setDoc(postRef, { likes: likes.filter(user => user !== currentUser.displayName) }, { merge: true });
    else setDoc(postRef, { likes: [...likes, currentUser.displayName] }, { merge: true });
  }

  return (
    <div className={`flex flex-row justify-center items-center rounded-lg w-20 h-7 ${className}`}>
      <button onClick={like} className='bg-teal-500 text-white flex-1 h-full flex justify-center items-center rounded-l-lg'>
        {currentUser && likes.includes(currentUser.displayName) ? 
          <RiHeartFill  /> :
          <RiHeartLine  />
        }
      </button>
      <div className='bg-white text-teal-600 flex-1 h-full flex justify-center items-center border border-teal-500 rounded-r-lg'>{likes.length}</div>
    </div>
  )
}

export default Likes