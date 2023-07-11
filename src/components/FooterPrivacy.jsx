import React from "react";

const FooterPrivacy = () => {
  return (
    <div id="footerPrivacy" className=" pt-5 pb-5">
      <div className="home-header text-center">
        <img src="/images/4-wine_glass.png" alt="Wine Glass" className="home-image" />
        <h2>C.O.R.K.S</h2>
        <img src="/images/4-wine_glass.png" alt="Wine Glass" className="home-image" />
      </div>
      <h5 className="text-center">Community of Reviews & Knowledgeable Sippers</h5>
      <div className="container">
        <div className="row justify-content-start">
          <div className="col">
            <h3>Privacy Policy:</h3>
            <div className="justify-content-start">
              <h5>
                At Corks, we value your privacy and are committed to protecting your personal information. When you use our website, we collect certain data such as your first name, state of residence, email address, and birthday. We use this information solely for the purpose of providing you with a personalized and enhanced experience on our platform.
                <br /><br />
                Rest assured that we do not share, sell, or disclose your personal information to any third parties for marketing purposes. We respect your privacy and strive to maintain the confidentiality and security of your data.
                <br /><br />
                Please note that while we take reasonable measures to protect your information, no method of data transmission or storage is 100% secure. We cannot guarantee the absolute security of your data, but we continuously work to safeguard it using industry-standard practices.
                <br /><br />
                By using our website, you consent to the collection and use of your personal information as outlined in this Privacy Policy. If you have any concerns or questions regarding your privacy or the handling of your data, please contact us.
                <br /><br />
                Thank you for being part of our wine community!
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FooterPrivacy;
