import React from "react";
import "./About.css";
import About1 from "../../assets/img/About1.png"; // Corrected path
import Sunrise from "../../assets/img/Sunrise.png"; // Corrected path
import childrenPark from "../../assets/img/childrenPark.jpg"; // Corrected path
import templeView from "../../assets/img/templeView.jpg"; // Corrected path and added .jpg extension


const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <img src={About1} alt="Nrupatunga Betta" className="hero-image" />
        <div className="hero-overlay">
          <h1>Nrupatunga Betta</h1>
          <p>Where Nature Meets Serenity</p>
        </div>
      </section>

      <section className="about-intro">
        <h2>Discover the Charm of Nrupatunga Betta</h2>
        <p>
          Nestled atop Unkal Hill in Hubli, Karnataka, Nrupatunga Betta offers a panoramic view of the twin cities, Hubli and Dharwad. This serene hillock is a favored spot for morning walkers, nature enthusiasts, and those seeking a peaceful retreat from urban life.
        </p>
      </section>

      <section className="about-highlights">
        <div className="highlight">
          <img src={Sunrise} alt="Sunrise at Nrupatunga Betta" />
          <div className="highlight-text">
            <h3>Mesmerizing Sunrises</h3>
            <p>
              Experience breathtaking sunrises that paint the sky with hues of orange and pink, offering a perfect start to your day.
            </p>
          </div>
        </div>

        <div className="highlight reverse">
          <img src={childrenPark} alt="Children's Park" />
          <div className="highlight-text">
            <h3>Family-Friendly Environment</h3>
            <p>
              The hill features a well-maintained park with children's play areas, making it an ideal spot for family outings and picnics.
            </p>
          </div>
        </div>

        <div className="highlight">
          <img src={templeView} alt="Devi Temple at Nrupatunga Betta" />
          <div className="highlight-text">
            <h3>Spiritual Retreat</h3>
            <p>
              Atop the hill, visitors can find a Devi Temple and a dargah, adding to the cultural and spiritual significance of the location.
            </p>
          </div>
        </div>
      </section>

      <section className="about-visit">
        <h2>Plan Your Visit</h2>
        <ul>
          <li><strong>Timings:</strong> 9 AM - 8 PM</li>
          <li><strong>Entry Fee:</strong> ₹20 for adults, ₹10 for children</li>
          <li><strong>Facilities:</strong> Children's park, Temple, canteen, well-lit pathways, transport for the elderly, and areas for events and pre-wedding shoots</li>
          <li><strong>Best Time to Visit:</strong> Early mornings or during sunset for the best views</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
