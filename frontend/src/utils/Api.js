import axios from "axios";

const getAuthToken = () => {
  return sessionStorage.getItem("jwt_token");
};

const apiUrl = import.meta.env.VITE_API_URL;

export const apiStatus = async () => {
  try {
    const response = await axios.get(`${apiUrl}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${apiUrl}v1/auth/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const register = async (username, password, confirmPassword) => {
  try {
    const response = await axios.post(
      `${apiUrl}v1/auth/register`,
      {
        username,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during register:", error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return {
        statusCode: 500,
        message: "Network error. Please try again later.",
      };
    } else {
      return {
        statusCode: 400,
        message: error.message || "Unexpected error occurred",
      };
    }
  }
};

export const getMhs = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${apiUrl}v1/mhs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getMhsbyNpm = async (npm) => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${apiUrl}v1/mhs/npm/${npm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMhs = async (newData) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${apiUrl}v1/mhs`, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    return {
      data: error.response.data.data || null,
      message: error.response
        ? error.response.data.message
        : "Failed to add data",
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export const updateMhs = async (npm, data) => {
  const token = getAuthToken();
  try {
    const response = await axios.patch(`${apiUrl}v1/mhs/${npm}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMhs = async (npm) => {
  const token = getAuthToken();
  try {
    const response = await axios.delete(`${apiUrl}v1/mhs/${npm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error);
  }
};
