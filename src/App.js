import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import IndexPage from "./pages/index.js";
import ShowPage from "./pages/show.js";
import './assets/scss/App.scss';

import LayoutNav from "./components/LayoutNav";
import Footer from "./components/LayoutFooter";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LayoutNav />
        <div className="wrapper">
          <div className="main">
            <Switch>
              <Switch>
                <Route
                  path="/index"
                  render={(props) => <IndexPage {...props} />}
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

        </div>

        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
