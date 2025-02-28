import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen" aria-label="読み込み中">
      <div className="animate-ping h-2 w-2 bg-blue-700 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-blue-700 rounded-full mx-4"></div>
      <div className="animate-ping h-2 w-2 bg-blue-700 rounded-full"></div>
    </div>
  )
}

export default Loading