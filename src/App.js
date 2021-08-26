import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PlayMinesweeper from "./minesweeper/PlayMinesweeper";
import Parent from "./test/RerenderTest";

const HOMEPAGE_PATH = "/";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path={HOMEPAGE_PATH} component={PlayMinesweeper} exact />
              { /*<Route path={HOMEPAGE_PATH} component={Parent} exact /> */}
          </Switch>
      </BrowserRouter>
  );
}

export default App;
