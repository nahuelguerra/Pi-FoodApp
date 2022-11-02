import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home.jsx';
import RecipeDetail from './components/RecipeDetail';
import CreateRecipe from './components/CreateRecipe.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path="/home/:id" component={RecipeDetail}></Route>
      <Route exact path='/createRecipe' component={CreateRecipe}/>
    </div>
  );
}

export default App;
