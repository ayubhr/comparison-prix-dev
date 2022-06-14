import React from "react";
import { withRouter, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
import LayoutAlternative from "./layouts/LayoutAlternative";
import LayoutSignin from "./layouts/LayoutSignin";

// Views
import Home from "./views/Home";
import Secondary from "./views/Secondary";
import Login from "./views/Login";
import Signup from "./views/Signup";

import Products from "./views/Products";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

function ReactQueryWrapper({ children }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>{children} </Hydrate>
    </QueryClientProvider>
  );
}

class App extends React.Component {
  componentDidMount() {
    document.body.classList.add("is-loaded");
    this.refs.scrollReveal.init();
  }

  // Route change
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.refs.scrollReveal.init();
    }
  }

  render() {
    return (
      <ReactQueryWrapper>
        <ScrollReveal
          ref="scrollReveal"
          children={() => (
            <Switch>
              <AppRoute
                exact
                path="/"
                component={Home}
                layout={LayoutDefault}
              />
              <AppRoute
                exact
                path="/secondary"
                component={Secondary}
                layout={LayoutAlternative}
              />
              <AppRoute
                exact
                path="/login"
                component={Login}
                layout={LayoutSignin}
              />
              <AppRoute
                exact
                path="/signup"
                component={Signup}
                layout={LayoutSignin}
              />
              <AppRoute
                exact
                path="/products"
                component={Products}
                layout={LayoutAlternative}
              />
            </Switch>
          )}
        />
      </ReactQueryWrapper>
    );
  }
}

export default withRouter((props) => <App {...props} />);
