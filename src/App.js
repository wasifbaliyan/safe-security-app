import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
