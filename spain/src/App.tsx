import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import ChapterRender from './Components/ChapterRender/ChapterRender';
import Navigation from './Components/Navigation/Navigation';
import TOS from './Components/Policies/TOS';
import PrivPol from './Components/Policies/PrivPol';
import {themes} from './Components/Helpers';

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

    useEffect(() => {
        const localTheme = localStorage.getItem('localTheme')
        if(localTheme) {setTheme(localTheme)}
    }, [setTheme])

    useEffect(() => {
        let root = document.documentElement;
        
        if(theme === 'light')  themes.light.map(prop => { return root.style.setProperty(prop.property, prop.value);}); 
        else if(theme === 'dark') themes.dark.map(prop => { return root.style.setProperty(prop.property, prop.value);});
        
        localStorage.setItem('localTheme', theme);
    }, [theme]);
  
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