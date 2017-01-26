import React from 'react';
import DetailedBlockView from './DetailedBlockView';
import $ from 'jquery';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

class BlockPage extends React.Component
{
    constructor(props) {
      super(props);      
      let initialState = { h: this.props.params.h };      
      this.state = $.extend({ }, initialState);
      console.log
    }
    
    componentDidMount() {
       
    }
    
    render() {
      return (
        <div>
          Block { this.state.h }
          <hr />
          <Link to={ "/" }>Home</Link> / <Link to={ "/blocks" }>Blocks</Link> / { this.state.h }
          <DetailedBlockView h={ this.state.h } />
        </div>
      );
    }
}

export default BlockPage;
