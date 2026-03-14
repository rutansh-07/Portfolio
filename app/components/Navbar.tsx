import React from 'react'
import Image from 'next/image'
import rutanshImage from '@/assets/Rutansh.jpg'

const Navbar = () => {
  return (
    <nav>
      <a href="/">
        <Image
          src={rutanshImage}
          alt="Rutansh Logo"
          width={112}
          height={40}
          className="w-28 cursor-pointer mr-14"
        />
      </a>
    </nav>
  )
}

export default Navbar