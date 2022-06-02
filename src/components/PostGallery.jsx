import { Link } from 'react-router-dom'
import {HiThumbUp, HiThumbDown} from 'react-icons/hi'

import React from 'react'

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
                <div className='flex flex-row gap-3 justify-center items-center text-black bg-white px-4 py-2 rounded-full'>
                  {Object.values(post.likes).filter(i => i).length} <HiThumbUp className={'text-lg hover:text-emerald-600 hover:scale-125 transition duration-200'} />
                  {Object.values(post.likes).filter(i => !i).length} <HiThumbDown className={'text-lg hover:text-red-600 hover:scale-125 transition duration-200'} />
                </div>
              </div>
              
            </nav>
          </Link>
        </div>))}
    </div>
  )
}

export default PostGallery