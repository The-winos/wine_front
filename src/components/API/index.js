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

export async function getAllWine() {
  try {
    const response = await fetch(`${BASE_URL}/wines`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
