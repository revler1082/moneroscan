import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configs from '../../server/config';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
//import DetailedBlockView from './DetailedBlockView'; // Our custom react component
import BlockPage from './BlockPage'; 

var config = configs["development"];

import RaisedButton from 'material-ui/RaisedButton';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.initialState = { };
    this.state = $.extend({}, this.initialState);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme({})}>
        <div>
          <AppBar title="Moneroscan" titleStyle={ { cursor: 'pointer' } } iconStyleLeft={ { display: 'none' } } onTitleTouchTap={ () => browserHistory.push(config.express.siteRoot) } />
          <hr style={{ color: '#cccccc' }} />
          {this.props.children}
          <Link to={"/blocks/" + Math.random() * 100 }>
            <RaisedButton label={ "Block 8" } style={{ }} />
          </Link>          
        </div>
      </MuiThemeProvider>
    );
  }

};

/**
  main()
*/
render(
  <Router history={browserHistory}>
    <Route path={ config.express.siteRoot + "" } component={App}>
      <Route path={ config.express.siteRoot + "blocks/:h"} component={BlockPage} />    
    </Route>
  </Router>,
  document.getElementById('app')
);
