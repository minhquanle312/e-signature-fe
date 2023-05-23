import { Container, Grid, Paper } from '@mui/material'
import FilesList from './FilesList'

const DashboardPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <FilesList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage
