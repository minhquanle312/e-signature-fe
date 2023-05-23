import useTokenApi from '@/api/useTokenApi'
import useUserApi from '@/api/useUserApi'
import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FileCard from './FileCard'

const VerifyPage = () => {
  const { uploadVerifyFile, verifyFile, updateVerifyFile } = useTokenApi()
  const { getCurrentUser } = useUserApi()

  const [filesData, setFilesData] = useState([])
  const [publicKey, setPublicKey] = useState('')
  const [signature, setSignature] = useState('')

  const fetchUserData = async () => {
    try {
      const data = await getCurrentUser()
      console.log('data', data)
      const filesList = data.data.verifies
      setFilesData(filesList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, []) // eslint-disable-line

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
        {filesData.map((file: any) => (
          <FileCard file={file} key={file.id} />
        ))}

        <Button
          component="label"
          htmlFor="upload-file-input"
          variant="contained"
          sx={{ marginTop: '12px', alignSelf: 'flex-start' }}
        >
          Upload file to check
        </Button>
        <input
          id="upload-file-input"
          type="file"
          hidden
          onChange={async (e) => {
            if (!e.target.files) return

            const formData = new FormData()
            formData.append('filename', e.target.files[0])

            await toast.promise(uploadVerifyFile(formData), {
              pending: 'Uploading file',
              success: 'Success',
              error: {
                render({ data }: any) {
                  return data?.message
                },
              },
            })
            fetchUserData()
          }}
        />
      </Box>
    </Container>
  )
}

export default VerifyPage
