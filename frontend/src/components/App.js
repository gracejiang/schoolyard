import '../styles/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Dashboard from './Dashboard'
import Profile from './Profile'
import Register from './Register'
import Login from './Login'
import ExchangePage from './ExchangePage'
import Group from './Group'
import Classes from './Classes'
import ClassDashboard from './ClassDashboard'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route exact path='/exchange'>
            <ExchangePage />
          </Route>
          <Route path='/profile/:username?'>
            <Profile />
          </Route>
          <Route exact path='/group'>
            <Group />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/classes'>
            <Classes />
          </Route>
          <Route exact path='/class-dashboard'>
            <ClassDashboard />
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
