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
  year_born,
  follower_count,
  following_count
) {
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
      year_born,
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

export async function getUserById(userId){
  try {
    const options={
      headers:{
        "Content-Type":"application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/users/${userId}`, options);
    const result= await response.json();

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

export async function getWineById(wineId){
  try {
    const options={
      headers:{
        "Content-Type":"application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/wines/${wineId}`, options);
    const result= await response.json();
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

export async function getReviewsByWineId(wineId){
  try {
    const options={
      headers:{
        "Content-Type":"application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/wines/${wineId}/reviews`, options);
    const result= await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }

}

export async function getReviewsByFollowers(userId){
  try {
    const options={
      headers:{
        "Content-Type":"application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/reviews/${userId}`, options);
    const result =await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
