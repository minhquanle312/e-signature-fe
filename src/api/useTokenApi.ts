import useAuth from '@/hooks/useAuth'
import { axiosPrivate, axiosPrivateUpload, handleAxiosError } from './axios'

type VerifyType = 'waiting' | 'signature valid' | 'signature invalid'

interface SignFileBody {
  privateKey: string
  // data: string
}

interface VerifyFileBody {
  urlFile: string
  publicKey: string
  signature: string
}

interface UpdateVerifyFileBody {
  verify: VerifyType
  publicKey: string
  signature: string
}

const useTokenApi = () => {
  const { userData } = useAuth()

  const getCurrentUserToken = async (): Promise<any> => {
    const userId = userData?.id
    try {
      const res = await axiosPrivate.get(`/pki?user=${userId}`)

      return res.data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  const generateNewToken = async (name: string) => {
    try {
      const res = await axiosPrivate.post(
        '/pki/generate-key-pair',
        JSON.stringify({ name })
      )

      return res.data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  const uploadVerifyFile = async (formData: any) => {
    try {
      const res = await axiosPrivateUpload.post(`/pki`, formData)

      return res.data
    } catch (error) {
      handleAxiosError(error)
    }
  }

  const signFile = async (fileId: string, body: SignFileBody) => {
    try {
      const res = await axiosPrivate.post(
        `/pki/sign/${fileId}`,
        JSON.stringify(body)
      )

      return res.data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  const verifyFile = async (body: VerifyFileBody) => {
    try {
      const res = await axiosPrivate.post('/pki/verify', JSON.stringify(body))

      return res.data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  const updateVerifyFile = async (id: string, body: UpdateVerifyFileBody) => {
    try {
      const res = await axiosPrivate.patch(`/pki/${id}`, JSON.stringify(body))

      return res.data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  return {
    getCurrentUserToken,
    generateNewToken,
    signFile,
    uploadVerifyFile,
    verifyFile,
    updateVerifyFile,
  }
}

export default useTokenApi
