import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const baseUrl = `http://192.168.10.22:3333/api/v1/`;
export const socketUrl = "http://192.168.43.77:3333/";


let token;
const getData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      let parseUserdata = JSON.parse(userData);
      token = parseUserdata.token;
    }
  } catch (e) {
    console.log("assyn storage error");
  }
};

getData();

export const getId = async () => {
  try {
    const userJSON = await AsyncStorage.getItem("userData");
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      if (user.user.hasOwnProperty("_id")) {
        return user.user._id;
      } else {
        console.log("ID not found in user object.");
        return null;
      }
    } else {
      console.log("User object not found in AsyncStorage.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user object from AsyncStorage:", error);
    return null;
  }
};
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
// const headersWithToken = { Accept: "application/json", "Content-Type": "application/json",
// authorization: token && `Bearer ${token}`
// };

const getHeadersWithToken = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const parseUserdata = JSON.parse(userData);
      const token = parseUserdata.token;
      const headersWithToken = {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      };
      return headersWithToken;
    }
  } catch (e) {
    console.log("async storage error");
  }
  return null;
};

const getHeadersWithTokenFormData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const parseUserdata = JSON.parse(userData);
      const token = parseUserdata.token;
      const headersWithToken = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      };
      return headersWithToken;
    }
  } catch (e) {
    console.log("async storage error");
  }
  return null;
};

async function apiRequest(method, url, data = null, headers = {}) {
  try {
    const response = await axios({
      method: method,
      url: baseUrl + url,
      data: data,
      headers: headers,
    });

    // Process the received data
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code other than 2xx
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received. Network error.");
    } else {
      // Something else went wrong
      console.error("Request error:", error.message);
    }

    throw new Error("API request failed");
  }
}

export const registerApi = async (data) => {
  try {
    const result = await apiRequest("POST", "user_signup", data, headers);
    return result;
  } catch (error) {
    console.error("Error in registerApi:", error);
    return error.response;
  }
};


export const loginApi = async (data) => {
  try {
    const result = await apiRequest("POST", "user_login", data, headers);
    return result;
  } catch (error) {
    console.error("Error in loginApi:", error);
    return error.response;
  }
}

