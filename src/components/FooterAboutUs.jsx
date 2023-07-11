import React from "react";

const FooterAboutUs = () => {
  const jess_url = "https://www.linkedin.com/in/jessica-piesco-60622513a/";
  const jen_url = "https://www.linkedin.com/in/jenniffermelchiade/";

  return (
    <div className="aboutfooter container">
     <h4 className="site-description py-4">
  Welcome to our wine community! We built this platform to address the common struggle of never knowing which wine to buy and enduring the disappointment of trying too many underwhelming options. Our site empowers you to make confident choices by providing access to genuine reviews from fellow wine enthusiasts, including your trusted friends and family. Explore a wide range of wines, save your favorites, and contribute your own reviews to create a vibrant community-driven resource. Discover the perfect bottle for every occasion and elevate your wine-drinking experience with us.
</h4>



      <h1 className="mt-5" id="header">
        Meet the Developers
      </h1>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="developer">
            <a href={jess_url}>
              <img
                src="/images/jessica.jpeg"
                alt="Jessica Picture"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
              />
            </a>

            <h3 className="bio">
              Jessy is an amazing mother to a delightful four-year-old. She's a
              proud geek through and through. She finds passion in figuring out
              issues and problem-solving.
            </h3>
            <h5>Favorite Wine: Apothic Dark</h5>
          </div>
        </div>

        <div className="col-md-6">
          <div className="developer">
            <a href={jen_url}>
              <img
                src="/images/jen.jpeg"
                alt="Jen Picture"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
              />
            </a>

            <h3 className="bio">
              Jenniffer is a software developer looking through the lens of
              possibility. A maverick, with a spirit of curiosity and adventure,
              she's fueled by her intellect and creativity towards innovation
              and social well-being. Her favorite fantasy book is Dune by Frank
              Herbert.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterAboutUs;
