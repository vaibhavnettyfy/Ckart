import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useAppContext } from "@/context";
import { logoutHandler, unAuthorizedHandler } from "@/helper";

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
        count: response.data.total,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: response.data.data,
        count: response.data.total || 0,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      handleUnauthorized();
      console.log("Hereeeee");
      // const { setUnAuthorixedPerson } = useAppContext();
      // setUnAuthorixedPerson(true);
      // logoutHandler();
    }
    return {
      success: false,
      data: [],
      count: 0,
      message: error?.response?.data?.message || "Something went wrong",
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
    if (error && error.response && error.response.status === 401) {
      const { setUnAuthorixedPerson } = useAppContext();
      setUnAuthorixedPerson(true);
      logoutHandler();
    }
    return {
      success: false,
      count: 0,
      data: [],
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const POST = async (url, data) => {
  try {
    const response = await axios.post(url, data);
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
        data: response.data.data,
        count: response.data.total,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      count: 0,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const DELETE = async (id) => {
  try {
    const cookies = new Cookies();
    const TOKEN = cookies.get("token");

    const headers = {
      "x-auth-token": TOKEN,
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
    if (error && error.response && error.response.status === 401) {
      const { setUnAuthorixedPerson } = useAppContext();
      setUnAuthorixedPerson(true);
      logoutHandler();
    }
    return {
      success: false,
      data: null,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const REMOVE = async (id) => {
  try {
    const response = await axios.delete(id);

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
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.put(url, data);
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
    console.log(error);
    return {
      success: false,
      data: null,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const PUT = async (url, data) => {
  try {
    const cookies = new Cookies();
    const TOKEN = cookies.get("token");
    const headers = {
      "x-auth-token": TOKEN,
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
    if (error && error.response && error.response.status === 401) {
      const { setUnAuthorixedPerson } = useAppContext();
      setUnAuthorixedPerson(true);
      logoutHandler();
    }
    return {
      success: false,
      data: [],
      count: 0,
      message: error?.response?.data?.message || "Something went wrong",
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
    if (error && error.response && error.response.status === 401) {
      const { setUnAuthorixedPerson } = useAppContext();
      setUnAuthorixedPerson(true);
      logoutHandler();
    }
    return {
      success: false,
      data: null,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

// FOR GET ALL LIST

// With out token get api call
export const GET = async (url) => {
  try {
    const response = await axios.get(url);
    console.log("response", response);
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
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};
