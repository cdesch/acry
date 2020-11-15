import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import IndexPage from "./pages/index.js";
import ShowPage from "./pages/show.js";
import SearchPage from "./pages/search.js";
import SelectPage from "./pages/selectPage";
import './assets/scss/App.scss';

import LayoutNav from "./components/LayoutNav";
import Footer from "./components/LayoutFooter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LayoutNav />
          <div className="main">
            <Switch>
              <Switch>
                <Route
                  path="/index"
                  render={(props) => <IndexPage {...props} />}
                />
                <Route
                  path="/search"
                  render={(props) => <SearchPage {...props} />}
                />
                <Route
                  path="/select"
                  render={(props) => <SelectPage {...props} />}
                />
                <Route
                  path="/show"
                  render={(props) => <ShowPage {...props} />}
                />
                <Route path="/acro/:id" children={<ShowPage />} />

                <Redirect to="/index" />
                <Redirect from="/" to="/index" />


              </Switch>
            </Switch>
          </div>


        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
