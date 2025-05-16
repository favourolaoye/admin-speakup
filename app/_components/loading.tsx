import React from 'react'
import { CgSpinner } from 'react-icons/cg'

export default function Loading() {
  return (
    <div className='w-full h-[400px] flex items-center justify-center bg-white'>
        <div className="flex gap-5 text-black text-xl items-center">
            <CgSpinner className='animate-spin'/>
             Loading...
        </div>
    </div>
  )
}
