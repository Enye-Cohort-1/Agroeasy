import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Products from './Product';
import { ROW_ITEMS_1 } from './constants';


/*this the first on component anotherlist.js */
export default class Row1 extends Component {
	render() {
		return (
        <Container fluid>
            <Row>
              {
               ROW_ITEMS_1.map(item => (
                    <Col key={item.name}>
                        <Products
                            title={item.name} pix={item.pix}
                            tag={item.cost} key={item.name}    
                         />
                     </Col>
                 ))
              }
           </Row>
        </Container>
		);
	}
}