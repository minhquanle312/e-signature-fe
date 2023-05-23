import useTokenApi from '@/api/useTokenApi'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'

const FileCard = ({ file }: any) => {
  const { verifyFile, updateVerifyFile } = useTokenApi()
  const [publicKey, setPublicKey] = useState(file.publicKey)
  const [signature, setSignature] = useState(file.signature)

  return (
    <Stack
      sx={{
        gap: '10px',
        border: '1px solid #cdcdcd',
        borderRadius: '6px',
        padding: '12px',
        boxShadow: '1px 1px 20px 0px #eee',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            width: '80%',
          }}
        >
          <Link
            color="primary"
            href={file.url}
            target="_blank"
            sx={{ mt: 3, textDecoration: 'none' }}
          >
            {file.name}
          </Link>
        </Typography>
        <Button>{file.verify}</Button>
      </Box>
      <TextField
        size="small"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        required
        label="Public Key"
        sx={{ width: '100%' }}
      />
      <TextField
        size="small"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        required
        label="Signature"
        sx={{ width: '100%' }}
      />
      <Button
        color="info"
        variant="outlined"
        sx={{ alignSelf: 'flex-end' }}
        onClick={async () => {
          if (publicKey.length === 0 || signature.length === 0) {
            return toast.error('Public Key and Signature is required')
          }
          const res = await toast.promise(
            verifyFile({ urlFile: file.url, publicKey, signature }),
            {
              pending: 'Verifying',
              success: 'Success',
              error: {
                render({ data }: any) {
                  return data?.message
                },
              },
            }
          )
          await updateVerifyFile(file.id, {
            verify: res.verify ? 'signature valid' : 'signature invalid',
            publicKey,
            signature,
          })
        }}
      >
        Verify
      </Button>
    </Stack>
  )
}

export default FileCard
