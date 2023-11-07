import React from "react";

const OptionAvatars = ({
  avatar,
  setAvatar,
  user,
  followingAvatars,
  followerAvatars,
}) => {
  return (
    <>
    {user.username==="cutegeek" ?
    <img
    src="/images/avatarJessy.png"
    alt="avatar"
    className={`avatar ${avatar === "avatarJessy.png" ? "selected" : ""}`}
    onClick={() => setAvatar("avatarJessy.png")}
    style={{
      height: "50px",
      width: "50px",
      objectFit: "contain",
      objectPosition: "center center",
      cursor: "pointer",
    }}
  /> : null }
  {user.username==="amazinghuman" ?
    <img
    src="/images/avatarJen.png"
    alt="avatar"
    className={`avatar ${avatar === "avatarJen.png" ? "selected" : ""}`}
    onClick={() => setAvatar("avatarJen.png")}
    style={{
      height: "50px",
      width: "50px",
      objectFit: "contain",
      objectPosition: "center center",
      cursor: "pointer",
    }}
  /> : null }
   {user.username==="iceman" ?
    <img
    src="/images/avatarJustin.png"
    alt="avatar"
    className={`avatar ${avatar === "avatarJustin.png" ? "selected" : ""}`}
    onClick={() => setAvatar("avatarJustin.png")}
    style={{
      height: "50px",
      width: "50px",
      objectFit: "contain",
      objectPosition: "center center",
      cursor: "pointer",
    }}
  /> : null }
      <img
        src="/images/character_1.png"
        alt="avatar"
        className={`avatar ${avatar === "character_1.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_2.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_3.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_4.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_5.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_6.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_7.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_8.png" ? "selected" : ""}`}
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
        className={`avatar ${avatar === "character_9.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character_9.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character10.png"
        alt="avatar"
        className={`avatar ${avatar === "character10.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character10.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character11.png"
        alt="avatar"
        className={`avatar ${avatar === "character11.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character11.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character12.png"
        alt="avatar"
        className={`avatar ${avatar === "character12.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character12.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character13.png"
        alt="avatar"
        className={`avatar ${avatar === "character13.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character13.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character14.png"
        alt="avatar"
        className={`avatar ${avatar === "character14.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character14.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character15.png"
        alt="avatar"
        className={`avatar ${avatar === "character15.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character15.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character16.png"
        alt="avatar"
        className={`avatar ${avatar === "character16.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character16.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character17.png"
        alt="avatar"
        className={`avatar ${avatar === "character17.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character17.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character18.png"
        alt="avatar"
        className={`avatar ${avatar === "character18.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character18.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character19.png"
        alt="avatar"
        className={`avatar ${avatar === "character19.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character19.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character20.png"
        alt="avatar"
        className={`avatar ${avatar === "character20.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character20.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character21.png"
        alt="avatar"
        className={`avatar ${avatar === "character21.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character21.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character22.png"
        alt="avatar"
        className={`avatar ${avatar === "character22.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character22.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character23.png"
        alt="avatar"
        className={`avatar ${avatar === "character23.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character23.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character24.png"
        alt="avatar"
        className={`avatar ${avatar === "character24.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character24.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character25.png"
        alt="avatar"
        className={`avatar ${avatar === "character25.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character25.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character26.png"
        alt="avatar"
        className={`avatar ${avatar === "character26.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character26.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character27.png"
        alt="avatar"
        className={`avatar ${avatar === "character27.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character27.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
        <img
        src="/images/character28.png"
        alt="avatar"
        className={`avatar ${avatar === "character28.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character28.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character29.png"
        alt="avatar"
        className={`avatar ${avatar === "character29.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character29.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character30.png"
        alt="avatar"
        className={`avatar ${avatar === "character30.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character30.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character31.png"
        alt="avatar"
        className={`avatar ${avatar === "character31.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character31.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character32.png"
        alt="avatar"
        className={`avatar ${avatar === "character32.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character32.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character33.png"
        alt="avatar"
        className={`avatar ${avatar === "character33.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character33.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character34.png"
        alt="avatar"
        className={`avatar ${avatar === "character34.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character34.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character35.png"
        alt="avatar"
        className={`avatar ${avatar === "character35.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character35.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character36.png"
        alt="avatar"
        className={`avatar ${avatar === "character36.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character36.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character37.png"
        alt="avatar"
        className={`avatar ${avatar === "character37.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character37.png")}
        style={{
          height: "50px",
          width: "50px",
          objectFit: "contain",
          objectPosition: "center center",
          cursor: "pointer",
        }}
      />
      <img
        src="/images/character38.png"
        alt="avatar"
        className={`avatar ${avatar === "character38.png" ? "selected" : ""}`}
        onClick={() => setAvatar("character38.png")}
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
