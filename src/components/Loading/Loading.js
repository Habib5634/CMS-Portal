import React from 'react'

const Loading = () => {
  return (
    <div className="relative h-screen flex justify-center items-center">
    <div className="absolute  top-0 left-0 right-0 bottom-0 bg-cover bg-center  " style={{ backgroundImage: 'url("https://images.unsplash.com/uploads/1412026095116d2b0c90e/3bf33993?q=80&w=1767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black overflow-y-auto bg-opacity-70  backdrop-blur-md flex justify-center items-center">
      
      <div className="animate-spin rounded-full border-t-4 border-emerald-600 border-opacity-100 h-12 w-12"></div>
    </div>
    
    </div>
    </div>
      
  )
}

export default Loading