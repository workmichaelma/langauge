import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux'
import { initializeStore, useStore } from 'store'

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import BottomNav from 'components/common/BottomNav'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    // marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    background: 'white',
  },
  footerPadding: {
    padding: theme.spacing(1, 1),
  }
}));

export default function MyApp(props) {
  const { Component, pageProps, initialReduxState} = props;
  const classes = useStyles();
  const store = useStore(initialReduxState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline /> 

            <Container component="main" className={classes.main} maxWidth="xs">
              <Component {...pageProps} />
            </Container>

            <footer className={classes.footer}>
              <Divider />
              <div className={classes.footerPadding}>
                <Container maxWidth="sm">
                  <BottomNav />
                </Container>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async context => {
  const store = initializeStore();

  const componentProps = await context.Component.getInitialProps({ ...context, store });
  return {
    pageProps: {
      ...componentProps,
      // Here will pass to page function
    },
    initialReduxState: store.getState(),
  }
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};