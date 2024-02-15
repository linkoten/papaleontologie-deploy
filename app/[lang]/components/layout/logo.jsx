import React from 'react';
import Image from 'next/image';
import logoImage from '@/public/images/logo_noir.jpg'


const logo = () => {
    return (
        
        <Image
          alt=''
          src={logoImage}
          className=' -z-10   object-cover  bg-black'
        />
        
    );
};

export default logo;