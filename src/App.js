import './App.scss';
import Router from './router/router';
import Box from "@mui/material/Box";

function App({ual}) {
  if (!ual) return null;
  return (
    <Box  className='app'>
        <Router ual = {ual} />
    </Box>
  );
}

export default App;
