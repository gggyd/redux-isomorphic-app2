import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux Smart
import RedditPage from "./containers/RedditPage";
import NewsPage from "./containers/NewsPage";

//Redux Dumb
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import error404 from "./components/404";

export default (
  <Route name="app" path="/" component={App}>
      <Route path="home" component={HomePage} />
      <Route path="reddit" component={RedditPage} />
      <Route path="news" component={NewsPage} />
      <Route path="about" component={AboutPage} />
      <Route path="*" component={error404}/>
  </Route>
);
