import React from "react";

const FooterAboutUs = () => {
  const jess_url = "https://www.linkedin.com/in/jessica-piesco-60622513a/";
  const jen_url = "https://www.linkedin.com/in/jenniffermelchiade/";
  const kyla_url ="https://www.linkedin.com/in/kyla-frisinger-9830b4197/";
  const justin_url= "https://www.linkedin.com/in/justin-piesco-39503525/"

  return (
    <div className="aboutfooter container">
      <div  className="text-center pt-5 pb-1">
      <div className="home-header">
        <img src="/images/4-wine_glass.png" alt="Wine Glass" className="home-image" />
        <h2>C.O.R.K.S</h2>
        <img src="/images/4-wine_glass.png" alt="Wine Glass" className="home-image" />
      </div>
      <h5>Community Of Reviews & Knowledgeable Sippers</h5>
    </div>
     <h4 className="site-description py-4">
  Welcome to our wine community! We built this platform to address the common struggle of never knowing which wine to buy and enduring the disappointment of trying too many underwhelming options. Our site empowers you to make confident choices by providing access to genuine reviews from fellow wine enthusiasts, including your trusted friends and family. Explore a wide range of wines, save your favorites, and contribute your own reviews to create a vibrant community-driven resource. Discover the perfect bottle for every occasion and elevate your wine-drinking experience with us.
</h4>



      <h3 className="text-center pt-5 pb-5 text-decoration-underline" id="header">
        Meet the Developers
      </h3>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="developer">
            <a href={jess_url}>
              <img
                src="/images/jessy.png"
                alt="Jessica Picture"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
                title="Jessy's LinkedIn"
              />
            </a>

            <h5 className="bio">
              Jessy is an amazing mother to a delightful four-year-old. She's a
              proud geek through and through. She finds passion in figuring out
              issues and problem-solving.
            </h5>
            <h6>Favorite Wine: Apothic Dark</h6>
          </div>
        </div>

        <div className="col-md-6">
          <div className="developer">
            <a href={jen_url}>
              <img
                src="/images/jenn.png"
                alt="Jen Picture"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
                title="Jen's LinkedIn"
              />
            </a>

            <h5 className="bio">
              Jenniffer is a software developer looking through the lens of
              possibility. A maverick, with a spirit of curiosity and adventure,
              she's fueled by her intellect and creativity towards innovation
              and social well-being.
            </h5>
            <h6>Favorite Wine: Undecided</h6>
          </div>
        </div>
      </div>
      <h3 className="text-center pt-5 pb-5 text-decoration-underline" id="header">
        Meet the Artists
      </h3>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="developer">
            <a href={kyla_url}>
              <img
                src="/images/kyla.png"
                alt="Kyla Picture"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
                title="Kyla's LinkedIn"
              />
            </a>

            <h5 className="bio">
            Kyla is an artsy and stylish individual whose vibrant energy is contagious. With a deep appreciation for anime, she brings her creativity to life through her unique sense of fashion and enthusiasm for all things imaginative.
            </h5>
            <h6>Favorite Wine: Sangria</h6>
          </div>
    </div>
    <div className="col-md-6">
          <div className="developer">
            <a href={justin_url}>
              <img
                src="/images/justin.png"
                alt="Justin Picture"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
                title="Justin's LinkedIn"
              />
            </a>

            <h5 className="bio">
            Justin is a one-of-a-kind artist who effortlessly blends his distinctive style with his passion for creativity. Alongside his love for his 4-year-old daughter, he finds solace in listening to Wu-Tang Clan's beats or hitting the basketball court for a game of hoops.
            </h5>
            <h6>Favorite Wine: Apothic Dark</h6>
          </div>
    </div>
    </div>
    </div>
  );
};

export default FooterAboutUs;
