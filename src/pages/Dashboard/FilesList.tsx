import useFileApi from '@/api/useFileApi'
import useTokenApi from '@/api/useTokenApi'
import useUserApi from '@/api/useUserApi'
import { Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Title from '../../components/dashboard/Title'
import FileRow from './FileRow'

export default function FilesList() {
  const { getCurrentUser } = useUserApi()
  const { uploadSingleFile } = useFileApi()
  const { getCurrentUserToken } = useTokenApi()
  const [filesData, setFilesData] = useState<any[]>([])
  const [privateKeys, setPrivateKeys] = useState<any[]>([])

  const fetchUserData = async () => {
    try {
      const data = await getCurrentUser()
      const tokenData = await getCurrentUserToken()
      console.log('tokenData', tokenData)
      const filesList = data.data.files
      setFilesData(filesList)
      setPrivateKeys(
        tokenData.data.map((item: any) => ({ ...item, label: item.name }))
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, []) // eslint-disable-line

  return (
    <React.Fragment>
      <Title>Your Files Uploaded</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Private Key</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesData.map((row: any) => (
            <FileRow key={row.id} data={row} privateKeys={privateKeys} />
          ))}
        </TableBody>
      </Table>
      <Button
        component="label"
        htmlFor="upload-file-input"
        variant="contained"
        sx={{ alignSelf: 'flex-end', mt: 5 }}
      >
        Upload New File
      </Button>
      <input
        id="upload-file-input"
        type="file"
        hidden
        onChange={async (e) => {
          if (!e.target.files) return

          const formData = new FormData()
          formData.append('filename', e.target.files[0])

          await toast.promise(uploadSingleFile(formData), {
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
    </React.Fragment>
  )
}
