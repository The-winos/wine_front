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

export async function getAllWine(){
  try {
    const response =await fetch(`${BASE_URL}/wines`);
    const result = await response.json();
    return result;
  }catch(error){
    console.error(error)
  }
}
