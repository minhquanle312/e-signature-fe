// import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { axiosPrivateUpload, handleAxiosError } from './axios'

const useFileApi = () => {
  // const axiosPrivate = useAxiosPrivate()

  const uploadSingleFile = async (formData: any) => {
    try {
      const res = await axiosPrivateUpload.post(`/uploads`, formData)

      return res.data
    } catch (error) {
      handleAxiosError(error)
    }
  }

  return { uploadSingleFile }
}

export default useFileApi
