import React, { useEffect, useState } from 'react'
import Moment from 'moment'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import useUserApi from '@/api/useUserApi'
import { Button } from '@mui/material'
import useFileApi from '@/api/useFileApi'
import { toast } from 'react-toastify'

const formatDate = (dateString: string) =>
  Moment(dateString).format('DD-MM-YYYY')

export default function Orders() {
  const { getCurrentUser } = useUserApi()
  const { uploadSingleFile } = useFileApi()
  const [filesData, setFilesData] = useState([])

  const fetchUserData = async () => {
    try {
      const data = await getCurrentUser()
      const filesList = data.data.files
      setFilesData(filesList)
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
            {/* <TableCell>Type</TableCell> */}
            <TableCell>Token</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesData.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{formatDate(row.createdAt)}</TableCell>
              <TableCell>
                <Link
                  color="primary"
                  href={row.url}
                  target="_blank"
                  sx={{ mt: 3 }}
                >
                  {row.name}
                </Link>
              </TableCell>
              {/* <TableCell>{row.type}</TableCell> */}
              <TableCell>token</TableCell>
              <TableCell align="right">
                <Button>generate token</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        component="label"
        htmlFor="upload-file-input"
        variant="contained"
        sx={{ alignSelf: 'flex-end', mt: 5 }}
      >
        {/* <Button variant="contained" sx={{ alignSelf: 'flex-end', mt: 5 }}> */}
        Upload New File
        {/* </Button> */}
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
