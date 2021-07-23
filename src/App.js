import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainTable from './components/MainTable/index';
import {BeerCard} from './components/BeerCard'
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path ='/' component={MainTable}/>
          <Route path='/:id' component={BeerCard}/>
        </Switch>
      </Router>   
    </div>
  );
}

export default App;
