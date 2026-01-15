import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center gap-7'>
            <div className="h-screen w-screen bg-gray-100 flex items-center gap-7 justify-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 gap-6  ">
                    <div className="max-w-md">
                        <div className="text-5xl font-dark font-bold items-center">404</div>
                        <p className="text-2xl md:text-3xl font-light leading-normal">
                            Sorry we couldn't find this page.
                        </p>
                        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage. </p>

                        <Link href="/" className="bg-bg-primary text-txt-primary rounded-[50px] border-2 border-txt-primary
     flex items-center justify-center font-poppins font-size-base font-weight-bold transition cursor-pointer">back to homepage</Link>
                    </div>
                    <div className="max-w-lg"></div>
                    <Image
                        src="/icons/music-logo.svg"
                        alt="logo"
                        height={100}
                        width={100}
                    />
                </div>
            </div>
        </div >
    );
}

export default NotFound;
