import React from "react";
import './Home.css'




export default function Home(props){
const {likesList} = props
console.log('likelist.movie', likesList)

const [currentImageIndex, setCurrentImageIndex] = React.useState(0);



React.useEffect(() => {
    const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % likesList.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
    }, []);

const carouselElements = likesList.map((item,index)=>(
<div key={index}>
<img 
    src={item.moviePoster}
    // alt={`Image ${index + 1}`}
    className={index === currentImageIndex ? 'active' : ''}
    />
</div>
))
    return(
        <div className="container">
            <div className="carousel">
                {carouselElements}
            </div>
            <h2 className="welcome">Welcome to Liked<span>Flix</span></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Debitis ducimus sunt sint eveniet incidunt fuga tempore voluptas
            officiis molestiae ullam asperiores vitae minima, error atque, 
            voluptatibus ex ea suscipit perspiciatis.
            </p>
        </div>
    )
}