// Create axios hook with session
import { useAuth } from "@clerk/nextjs"

import { axiosInstance } from "@/lib/api"

const useAuthAxios = () => {
  const { getToken } = useAuth()

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const getProfile = async (handle, type) => {
    const res = await axiosInstance.get(
      `/endorsements/${handle}?type=${type}&includeUser=true`
    )
    return res.data
  }

  const getUser = async (email) => {
    const res = await axiosInstance.get(`/users?email=${email}`)
    return res.data
  }

  const postEndorse = async (body) => {
    const res = await axiosInstance.post(`/users/endorse`, body)
    return res.data
  }

  return {
    getProfile,
    getUser,
    postEndorse,
    authAxios: axiosInstance
  }
}
export default useAuthAxios
