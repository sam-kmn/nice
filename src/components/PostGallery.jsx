import { Link } from 'react-router-dom'
import Likes from './Likes'

const PostGallery = ({posts}) => {
  return (
    <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-3'>
      {posts && posts.map(post => 
        (<div key={post.id} className='relative group break-inside-avoid-column'>
          <Link to={'/i/'+post.id}>
            <img className='rounded-lg group-hover:brightness-50' src={post.url} alt='test' />
            <nav className='invisible group-hover:visible absolute inset-0 p-2 text-white flex flex-col justify-between'>
              <div className='text-lg font-semibold text-center'>{post.title}</div>
              <div className='flex justify-between items-center px-3 '>
                <div className='text-lg font-semibold'>@{post.user}</div>
                <Likes id={post.id} /> 
              </div>
            </nav>
          </Link>
        </div>))}
    </div>
  )
}

export default PostGallery