const BASE_URL = "http://localhost:8080/api";

export async function authUser(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  const loginOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}/users/login`, loginOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(
  username,
  password,
  name,
  state,
  role,
  email,
  birthday,
  follower_count,
  following_count
) {
  console.log("banana");
  const registerOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      name,
      state,
      role,
      email,
      birthday,
      follower_count,
      following_count,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}/users/register`, registerOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(userId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/users/${userId}`, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllWine() {
  try {
    const response = await fetch(`${BASE_URL}/wines`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getWineById(wineId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/wines/${wineId}`, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllReviews() {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getReviewsByWineId(wineId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${BASE_URL}/wines/${wineId}/reviews`,
      options
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getReviewsByFollowers(userId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/reviews/${userId}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateFollower(user_id, follower_id) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id,
        follower_id,
      }),
    };
    const response = await fetch(`${BASE_URL}/followers/${user_id}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getFollowersById(userId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/followers/${userId}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getReviewByUser(userId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${BASE_URL}/users/${userId}/reviews`,
      options
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createWine(
  author_id,
  name,
  image_url,
  price,
  rating,
  region,
  flavor //this is the ENUM for type of wine
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      author_id,
      name,
      image_url,
      price,
      rating,
      region,
      flavor,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}/wines`, options);
    const result = await response.json();
    console.log(result, "api result");
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createReview({
  wine_id,
  user_id,
  name,
  rating,
  price,
  review_comment,
  image_url,
  review_date,
  location,
}) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      wine_id,
      user_id,
      name,
      rating,
      price,
      review_comment,
      image_url,
      review_date,
      location,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}/reviews`, options);
    const result = await response.json();
    console.log(result, "api result from Review");
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function checkExistingWine(wineName) {
  const response = await fetch(
    `${BASE_URL}/wines?name=${encodeURIComponent(wineName)}`
  );
  const wines = await response.json();
  console.log(wines, "what is wines?");

  for (const wine of wines) {
    console.log(wine, "what is wine?");
    console.log(wine.name, "wine.name");
    console.log(wineName, "wineName");
    if (wine.name.toLowerCase() === wineName.toLowerCase()) {
      console.log("Wine found");
      return wine;
    }
  }

  console.log("No matching wine found");
  return null;
}

export async function updateUser(
  username,
  password,
  name,
  state,
  avatar,
  role,
  email,
  bio,
  birthday,
  follower_count,
  following_count
) {
  try {
    const body = {
      username,
      password,
      name,
      state,
      avatar,
      role,
      email,
      bio,
      birthday,
      follower_count,
      following_count,
    };

    if (birthday !== "" && birthday !== null) {
      body.birthday = birthday;
    } else {
      delete body.birthday;
    }

    const options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${BASE_URL}/users/${username}`, options);
    const result = await response.json();
    console.log(result, "what's happening");
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateWine(
  wineId,
  author_id,
  name,
  image_url,
  price,
  region,
  flavor
) {
  try {
    const body = {
      author_id,
      name,
      image_url,
      price,
      region,
      flavor
    };


    const options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${BASE_URL}/wines/${wineId}`, options);
    const result = await response.json();
    console.log(result, "what's happening");
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserPassword(userId, password) {
  try {
    const body = {
      password,
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      `${BASE_URL}/users/${userId}/password`,
      options
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateAdminUserPassword(userId, password) {
  try {
    const body = {
      password,
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      `${BASE_URL}/users/${userId}/admin/password`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to update password");
    }

    const result = await response.text();
    return result.password;
  } catch (error) {
    console.error(error);
  }
}
//fetches all favorites
export async function getFavorites(userId) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/favorites/${userId}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

//adds a Wine to favorites

export async function addFavorite(user_id, wine_id) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id,
        wine_id,
      }),
    };
    const response = await fetch(`${BASE_URL}/favorites/`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

//removes a Wine from favorites

export async function removeFavorite(favoriteId) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/favorites/${favoriteId}`,
      options
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItem(routeType, itemId) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await fetch(`${BASE_URL}/${routeType}/${itemId}`, options);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
