import axios from "axios";
import Cookies from "universal-cookie";

export const post = async (url, data) => {
  try {
    const cookies = new Cookies();
    const TOKEN = cookies.get("token");

    const headers = {
      "x-auth-token": TOKEN,
    };
    const response = await axios.post(url, data, {
      headers,
    });

    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: response.data.message ||error.message || "something_went_wrong",
    };
  }
};

export const get = async (url) => {
  try {
    const cookies = new Cookies();
    const TOKEN = cookies.get("token");

    const headers = {
      "x-auth-token": TOKEN,
    };

    const response = await axios.get(url, {
      headers,
    });

    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        count: response.data.total,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        count: response.data.total || 0,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      count: 0,
      data: [],
      message: response.data.message || error.message,
    };
  }
};

export const POST = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log("response",response);
    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error?.response?.data?.message || error.message || "something_went_wrong",
    };
  }
};

export const DELETE = async (id) => {
  try {
    const TOKEN = localStorage.getItem("TOKEN");

    const headers = {
      Authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.delete(id, {
      headers,
    });
    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: response.data.message || error.message || "something_went_wrong",
    };
  }
};

export const put = async (url, data) => {
  try {
    const TOKEN = localStorage.getItem("TOKEN");

    const headers = {
      Authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.put(url, data, {
      headers,
    });
    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: response.data.message || error.message || "something_went_wrong",
    };
  }
};

export const patch = async (url, data) => {
  try {
    const TOKEN = localStorage.getItem("TOKEN");

    const headers = {
      Authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.patch(url, data, {
      headers,
    });
    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: response.data.message || error.message || "something_went_wrong",
    };
  }
};

// FOR GET ALL LIST

export const GET = async (url) => {
  try {
    const TOKEN = localStorage.getItem("TOKEN");

    const headers = {
      Authorization: `Bearer ${TOKEN}`,
    };

    const response = await axios.get(url, {
      headers,
    });
    console.log("response",response);
    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: response.data.message || error.message || "something_went_wrong",
    };
  }
};
