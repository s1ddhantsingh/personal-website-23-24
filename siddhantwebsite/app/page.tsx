import Image from 'next/image'
import SpotifyView from './components/SpotifyView'
import AboutMe from './components/AboutMe'

/*
<Image
  src="/vercel.svg"
  alt="Vercel Logo"
  className="dark:invert"
  width={100}
  height={24}
  priority
/>
*/

/*
planning: 
1. put in awards
2. put in my 3 coolest projects
3. put in my skills
4. blog
5. what i'm currently listening to on spotify <-> API for page queries.
6. include my artworks 
*/
export default function Home() {
  return (
    <main className='justify-center flex flex-shrink gap-4 m-5'>
      <SpotifyView />
      <AboutMe />
    </main>
  )
}
