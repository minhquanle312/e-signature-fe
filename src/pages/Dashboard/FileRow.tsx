import {
  Autocomplete,
  Button,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Link,
  Box,
} from '@mui/material'
import Moment from 'moment'
import { toast } from 'react-toastify'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import useFileApi from '@/api/useFileApi'
import { useState } from 'react'
import useTokenApi from '@/api/useTokenApi'

const formatDate = (dateString: string) =>
  Moment(dateString).format('DD-MM-YYYY')

const FileRow = ({ data, privateKeys }: any) => {
  const { updateFilePki, updateFileSignature } = useFileApi()
  const { signFile } = useTokenApi()
  const [expand, setExpand] = useState<any>(false)

  return (
    <>
      <TableRow key={data.id} sx={{ '& td': { border: expand && 0 } }}>
        <TableCell>{formatDate(data.createdAt)}</TableCell>
        <TableCell sx={{ maxWidth: '400px' }}>
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(data.signatureToken)
            }}
          >
            <Link
              color="primary"
              href={data.url}
              target="_blank"
              sx={{ mt: 3 }}
            >
              {data.name}
            </Link>
          </Typography>
        </TableCell>
        <TableCell sx={{ width: '300px' }}>
          <Autocomplete
            size="small"
            defaultValue={
              data.pkiId && privateKeys.length > 0
                ? privateKeys.find((item: any) => item.id === data.pkiId)?.name
                : ''
            }
            id="private-key-list"
            options={privateKeys}
            sx={{ width: '100%' }}
            onChange={async (event, newValue: any) => {
              if (!newValue) return
              try {
                await toast.promise(updateFilePki(data.id, newValue.id), {
                  pending: 'Select Token',
                  success: 'Success',
                  error: {
                    render({ data }: any) {
                      return data?.message
                    },
                  },
                })
                // fetchUserData()
              } catch (error) {
                console.log(error)
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="info"
            onClick={async () => {
              try {
                const res = await toast.promise(
                  signFile(data.id, {
                    privateKey: privateKeys.find(
                      (item: any) => data.pkiId === item.id
                    ).privateKey,
                  }),
                  {
                    pending: 'Signing file',
                    success: 'Success',
                    error: {
                      render({ data }: any) {
                        return data?.message
                      },
                    },
                  }
                )
                console.log('res', res)
                await updateFileSignature(data.id, res.signature)
                // fetchUserData()
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Sign
          </Button>
          <IconButton
            size="small"
            sx={{ marginLeft: '10px' }}
            onClick={() => {
              setExpand(!expand)
            }}
          >
            {expand ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {expand ? (
        <TableRow>
          <TableCell colSpan={4} sx={{ maxWidth: '100%' }}>
            {data.signatureToken ? (
              <>
                {' '}
                <Button
                  variant="contained"
                  onClick={() => {
                    navigator.clipboard.writeText(data.signatureToken)
                  }}
                  sx={{ marginBottom: '12px' }}
                >
                  Copy Signature
                </Button>
                <Typography
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    whiteSpace: 'break-spaces',
                    cursor: 'pointer',
                    border: '1px solid #cdcdcd',
                    borderRadius: '6px',
                    padding: '6px',
                    boxShadow: '1px 1px 20px 0px #eee',
                  }}
                >
                  {data.signatureToken}
                </Typography>
              </>
            ) : (
              <Typography>
                Click sign button to generate signature with current private key
              </Typography>
            )}
          </TableCell>
        </TableRow>
      ) : null}
    </>
  )
}

export default FileRow
