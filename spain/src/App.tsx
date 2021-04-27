import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import ChapterRender from './Components/ChapterRender/ChapterRender';
import Navigation from './Components/Navigation/Navigation';
import TOS from './Components/Policies/TOS';
import PrivPol from './Components/Policies/PrivPol';

// Pages
import Welcome from './Pages/Support/Support';
import Home from './Pages/Home/Home';
import Founders from './Pages/Founders/Founders';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Manga from './Pages/Manga/Manga';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>({loggedIn: false});
  const [theme, setTheme] = useState<string>('dark');
  
  return (
    <>
      <Router basename='/mangaly'>
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} theme={theme} setTheme={setTheme} />
        <Switch>
          <Route path='/' exact render={(props) => (<Home isLoggedIn={isLoggedIn} {...props}/>)} />
          <Route path='/support' render={(props) => (<Welcome {...props}/>)} />
          <Route path='/founders' component={Founders} />
          <Route path='/register' component={Register} />
          <Route path='/login' render={(props) => (<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} {...props}/>)} />
          <Route path='/chapter' render={(props) => (<ChapterRender {...props}/>)} />
          <Route path='/manga' render={(props) => (<Manga {...props}/>)} />
          <Route path='/tos' component={TOS} />
          <Route path='/policy' component={PrivPol} />
        </Switch>
      </Router>
    </>
  );
}

export default App;