import { Button, Container, Box, TextField } from '@mui/material'
import TokenList from './TokenList'
import { useEffect, useState } from 'react'
import useTokenApi from '@/api/useTokenApi'
import { toast } from 'react-toastify'

const TokenPage = () => {
  const { generateNewToken, getCurrentUserToken } = useTokenApi()
  const [tokenName, setTokenName] = useState('')
  const [tokensData, setTokensData] = useState([])

  const fetchTokenData = async () => {
    try {
      const data = await getCurrentUserToken()
      const tokensList = data.data
      setTokensData(tokensList)
    } catch (error) {
      console.log(error)
    }
  }

  const generateToken = async () => {
    try {
      await toast.promise(generateNewToken(tokenName), {
        pending: 'Generate token',
        success: 'Success',
        error: {
          render({ data }: any) {
            return data?.message
          },
        },
      })
      fetchTokenData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTokenData()
  }, []) // eslint-disable-line

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <TokenList data={tokensData} />
      <Box sx={{ display: 'flex', marginTop: '24px' }}>
        <TextField
          size="small"
          required
          label="Signature name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: '12px' }}
          onClick={generateToken}
        >
          Generate Token
        </Button>
      </Box>
    </Container>
  )
}

export default TokenPage
