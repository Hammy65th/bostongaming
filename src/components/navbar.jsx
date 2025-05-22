import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../public/logo.png'

const navbar = () => {
  return (
<nav className="flex items-center justify-between max-w-7xl mx-auto px-10 py-8">

  <div className="flex items-center gap-2">
    <Image src={Logo} alt="logo" className="w-24 h-24" />
    <span className="font-bold text-xl">Boston Gaming</span>
  </div>

  <ul className="flex gap-4 text-md font-bold">
    <li>Products</li>
    <li>Design Your Own</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>

  )
}

export default navbar