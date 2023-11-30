import {Routes , Route} from 'react-router-dom';
import Home from "./routes/home/home.component";
import './App.css';
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
  return <h2>I am shop component</h2>
}


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element = {<Home />} />
        <Route path='shop' element = {<Shop /> } /> 
      </Route>
    </Routes>
  )
}

export default App;
