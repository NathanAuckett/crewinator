import './App.css';

import { Route, Routes} from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import {LoginSignup} from "./pages/LoginSignup";
import {Dashboard} from "./pages/Dashboard";
import {EventsView} from "./pages/EventsView";
import {GameLibrary} from "./pages/GameLibrary";
import {FriendListPage} from "./pages/FriendListPage";
import {NewEvent} from './pages/NewEvent';
import {NewGame} from './pages/NewGame';
import {NewFriend} from './pages/NewFriend';
import {SearchGames} from './pages/SearchGames';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      
      <Grid container direction="column" wrap="nowrap">
        <Grid display="flex" justifyContent="center">
          <h1>Crewinator</h1>
        </Grid>
        
        <Routes>
          <Route path="/" element={<LoginSignup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="" element={<EventsView/>}/>
            <Route path="library" element={<GameLibrary/>}/>
            <Route path="games" element={<SearchGames/>}/>
            <Route path="friends" element={<FriendListPage/>}/>
            <Route path="new-event" element={<NewEvent/>}/>
            <Route path="new-game" element={<NewGame/>}/>
            <Route path="new-friend" element={<NewFriend/>}/>
          </Route>
        </Routes>
      </Grid>
    </ThemeProvider>
  );
}

export default App;