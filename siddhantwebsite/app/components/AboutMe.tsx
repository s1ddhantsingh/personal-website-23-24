import Image from 'next/image'

const AboutMe = () => {
  return (
    <section className=" outline outline-black rounded-lg p-5 hover:ease-linear hover:duration-150">
        <div className='text-2xl underline'>Siddhant Singh</div>
        <div className="text-xl">welcome to my slice of the internet! i&apos;m an 
        ambitious 17 year old looking to take asymetric risks and make a difference on this world.</div>
        {/* <Image className="rounded-full p-4å" src="/profile.jpeg" width={200} height={200} alt="siddhant singh flic" /> */}
    </section>
    )
}

export default AboutMe