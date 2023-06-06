import React from 'react';

const OptionAvatars = ({avatar, setAvatar}) => {
  return (
    <>
<img
                    src="/images/character_1.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_1.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_1.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_2.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_2.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_2.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_3.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_3.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_3.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_4.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_4.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_4.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_5.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_5.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_5.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_6.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_6.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_6.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_7.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_7.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_7.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_8.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_8.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_8.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/character_9.png"
                    alt="avatar"
                    className={`avatar ${
                      avatar === "character_9.png" ? "selected" : ""
                    }`}
                    onClick={() => setAvatar("character_9.png")}
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      objectPosition: "center center",
                      cursor: "pointer",
                    }}
                  />
    </>
  );
};

export default OptionAvatars;
