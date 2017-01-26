import React from 'react';
import { Card, CardTitle } from 'material-ui/card';
import $ from 'jquery';
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody} from 'material-ui/table';

class DetailedBlockView extends React.Component
{
    constructor(props) {
      super(props);
      
      let initialState = { 
        result: {
          block_header: {
            height: '',
            hash: ''
          },
          json: {
            
          }
        }, 
        processing: true 
      };
      
      this.state = $.extend({ }, initialState);
      console.log(this.props);
    }
    
    componentDidMount() {
      $.ajax({
        url: '/api/1/blocks/' + this.props.h,
        dataType: 'json',
        type: 'GET',
        success: function(response) {
          this.setState({
            result: response.result
          });
          console.log(this.state);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });            
    }
    
    render() {
      return (
        <Table>
            <TableBody>
              <TableRow>
                <TableRowColumn>Height</TableRowColumn>
                <TableRowColumn>{ this.state.result.block_header.height }</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Hash</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Block Size</TableRowColumn>
                <TableRowColumn>big</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Block difficulty</TableRowColumn>
                <TableRowColumn>hard</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>        
      );
    }
}

export default DetailedBlockView;
