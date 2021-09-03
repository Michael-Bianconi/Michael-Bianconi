import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PlayMinesweeper from "./minesweeper/PlayMinesweeper";
import PlaySnake from "./snake/PlaySnake";
import Homepage from "./homepage/Homepage";
import Header from "./general/Header";
import {About} from "./about/About";

const HOMEPAGE_PATH = "/";
const MINESWEEPER_PATH = "/minesweeper";
const SNAKE_PATH = "/snake";
const ABOUT_PATH = "/about";

function App() {
  return (
      <BrowserRouter>
          <Header />
          <Switch>
              <Route path={HOMEPAGE_PATH} component={Homepage} exact />
              <Route path={MINESWEEPER_PATH} component={PlayMinesweeper} exact />
              <Route path={SNAKE_PATH} component={PlaySnake} exact />
              <Route path={ABOUT_PATH} component={About} exact />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
