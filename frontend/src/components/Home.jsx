import Creators from "../Home/Creators"
import Devotional from "../Home/Devotional"
import Hero from "../Home/Hero"
import Trending from "../Home/Trending"


function Home() {
  return (<>
    <Hero />
    <Trending />
    <Devotional />
    <Creators />
    </>
  )
}

export default Home