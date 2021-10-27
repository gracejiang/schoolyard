import './styles/App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import UploadIcs from './components/UploadIcs'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route component={Dashboard} exact path='/' />
          <Route component={UploadIcs} exact path='/upload-ics' />
          <Route component={Register} exact path='/register' />
          <Route component={Login} exact path='/login' />
        </Switch>
      </Router>
    </div>
  )
}

export default App
