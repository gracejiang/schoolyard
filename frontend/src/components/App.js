import '../styles/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Dashboard from './Dashboard'
import UploadIcs from './UploadIcs'
import Profile from './Profile'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/upload-ics">
            <UploadIcs />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
