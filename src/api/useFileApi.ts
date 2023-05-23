// import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { axiosPrivateUpload, axiosPrivate, handleAxiosError } from './axios'

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

  const updateFilePki = async (fileId: string, pkiId: string) => {
    try {
      const res = await axiosPrivate.patch(
        `/uploads/${fileId}`,
        JSON.stringify({ pkiId })
      )

      return res.data
    } catch (error) {
      handleAxiosError(error)
    }
  }

  const updateFileSignature = async (
    fileId: string,
    signatureToken: string
  ) => {
    try {
      const res = await axiosPrivate.patch(
        `/uploads/${fileId}`,
        JSON.stringify({ signatureToken })
      )

      return res.data
    } catch (error) {
      handleAxiosError(error)
    }
  }

  // const generateFileToken = async (fileId: string, url: string) => {
  //   try {
  //     const res = await axiosPrivate.patch(
  //       `/uploads/generateToken/${fileId}`,
  //       JSON.stringify({ url })
  //     )

  //     return res.data
  //   } catch (error) {
  //     handleAxiosError(error)
  //   }
  // }

  // return { uploadSingleFile }
  return { uploadSingleFile, updateFilePki, updateFileSignature }
  // return { uploadSingleFile, generateFileToken, updateFilePki }
}

export default useFileApi
