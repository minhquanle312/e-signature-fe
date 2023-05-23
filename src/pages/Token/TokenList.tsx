import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const ToggleHiddenInput = ({ value, label, id }: any) => {
  const [hidden, setHidden] = useState(true)
  const emptyString: string = ''
  // '●'

  return (
    <FormControl sx={{ flex: 1 }} variant="outlined">
      <InputLabel size="small">{label}</InputLabel>
      <OutlinedInput
        size="small"
        type="text"
        value={hidden ? emptyString.padStart(value.length, '●') : value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle token visibility"
              onClick={() => setHidden(!hidden)}
              onMouseDown={(e) => {
                e.preventDefault()
              }}
              edge="end"
              size="small"
            >
              {!hidden ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  )
}

const TokenList = ({ data }: any) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {data.map((pki: any, index: any) => (
        <Box key={index}>
          <Typography sx={{ marginBottom: '10px' }}>{pki.name}</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
            }}
          >
            <ToggleHiddenInput label="Private Key" value={pki.privateKey} />
            <ToggleHiddenInput label="Public Key" value={pki.publicKey} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default TokenList
