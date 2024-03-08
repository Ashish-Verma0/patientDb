import axios from 'axios'
export const getFetch = async (url) => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios({
      method: 'get',
      url: `${url}`,
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    })
    // if (response.status === 200) {
    return response
    // }
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getFetchByLimit = async (url, limit, page) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'GET',
      url: `${url}/${limit}/${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    if (response.status === 200) {
      return await response?.data
    }
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getOneFetch = async (url, id) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'GET',
      url: `${url}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    if (response?.status === 200) {
      return await response?.data
    }
  } catch (error) {
    console.log(error)
    if (error?.response?.status === 401) {
      return 401
    }
    return error
  }
}
export const postFetch = async (url, data) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      },
      data,
      withCredentials: true,
    })
    if (response) {
      return response
    }
  } catch (error) {
    return error
  }
}
export const postFetchUser = async (url, data) => {
  try {
    // const token = localStorage.getItem("token")
    const response = await axios({
      method: 'post',
      url,
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
      //   withCredentials: true,
    })
    if (response) {
      return response
    }
  } catch (error) {
    return error
  }
}

export const postFetchContent = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // if (response.status >= 200 && response.status < 300) {
    return response.data
    // } else {
    //   throw new Error(`Request failed with status ${response.status}`)
    // }
  } catch (error) {
    console.error('Error in postFetchContent:', error)
    throw error
  }
}

export const patchFetch = async (url, id, data) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'patch',
      url: `${url}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
      withCredentials: true,
    })
    if (response?.status === 200) {
      return response
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      return 401
    } else {
      return error?.response
    }
  }
}
export const putFetch = async (url, data) => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios({
      method: 'put',
      url: `${url}`,
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      },
      data,
      // withCredentials: true,
    })
    if (response.status === 200) {
      return response
    }
  } catch (error) {
    if (error) {
      return 401
    } else {
      return error.response
    }
  }
}
export const putFetchById = async (url) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'put',
      url: `${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    if (response.status === 200) {
      return response
    }
  } catch (error) {
    if (error) {
      return 401
    } else {
      return error.response
    }
  }
}
export const putFetchData = async (url, data) => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios({
      method: 'put',
      url: `${url}`,
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data,
      // withCredentials: true,
    })
    if (response) {
      return response
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      return 401
    } else {
      return error.response
    }
  }
}
export const deleteFetch = async (url, id) => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios({
      method: 'delete',
      url: `${url}/${id}`,
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    })
    if (response.status === 200) {
      return response
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      return 401
    }
  }
}

export const postFetchData = async (url, data) => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios({
      method: 'post',
      url: `${url}`,
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data,
      // withCredentials: true,
    })
    if (response) {
      return response?.data
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      return 401
    } else {
      return error
    }
  }
}
