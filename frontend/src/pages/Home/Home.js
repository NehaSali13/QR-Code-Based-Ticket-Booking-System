// src/components/Home.js
import React from "react";
import "./Home.css";
import heroImage from "../../assets/img/Hero.jpg";
import Intro1 from "../../assets/img/Intro1.jpg";
import Intro2 from "../../assets/img/Intro2.png";
import Explor1 from "../../assets/img/Explor1.jpg";
import Explor2 from "../../assets/img/Explor2.jpg";
import Explor3 from "../../assets/img/Explor3.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <img src={heroImage} alt="Scenic view" className="hero-img" />
        <div className="hero-text">
          <h1>Discover your world</h1>
          <p>Indulge your adventurous spirit</p>
        </div>
      </section>

      <section className="intro">
        <div className="intro-grid">
          <img src={Intro1} alt="Water adventure" className="intro-img intro1-img" />
          <div className="intro-text intro1-text">
            <h2>Welcome to Nrupatunga Betta – A Peaceful Escape in Hubli!  </h2>
            <p className="intropara">
             Come and enjoy the fresh air, beautiful views, and relaxing atmosphere of Nrupatunga Betta, one of Hubli’s favorite spots. Whether you’re looking to take a quiet walk, enjoy a fun picnic with your family, or watch a stunning sunset, this hilltop has it all. You’ll also find a kids’ park to play in and a canteen to grab a snack. It’s the perfect place to unwind and enjoy nature!
            </p>
          </div>
          <div className="intro-text intro2-text">
            <h2>A Perfect Place for Kids to Play and Explore</h2>
            <p className="intropara">
              Looking for a fun spot the whole family can enjoy? Nrupatunga Betta offers a safe and joyful space for children to play and explore! The dedicated kids’ area features swings, slides, and open lawns where children can laugh, run around, and enjoy the outdoors. With plenty of space for games and picnics, it’s a wonderful way to spend quality time together in nature. Parents can relax in the fresh air while kids stay active and happy.
            </p>
          </div>
          <img src={Intro2} alt="Resort lounge" className="intro-img intro2-img" />
        </div>
      </section>

      <section className="explore">
        <h2>Discover the Wonders of Nrupatunga Betta Park</h2>
        <div className="card-grid">
          <div className="card">
            <img src={Explor1} alt="Nature's Companions" />
            <h3>Nature's Companions</h3>
          </div>
          <div className="card">
            <img src={Explor2} alt="Senior-Friendly Ride" />
            <h3>Senior-Friendly Ride</h3>
          </div>
          <div className="card">
            <img src={Explor3} alt=" Hilltop Sanctuary" />
            <h3>Hilltop</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
