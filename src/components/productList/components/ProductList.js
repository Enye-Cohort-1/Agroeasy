import React from 'react';
import { List } from 'antd';

import Product from './Product';
import { EXAMPLE_PRODUCTS, PRODUCT_LIST_CLASSNAME } from '../constants';

// React Component used to render the list of product items
class ProductList extends React.Component {
    render() {
        return(
            <List
                bordered
                className={PRODUCT_LIST_CLASSNAME}
                dataSource={EXAMPLE_PRODUCTS}
                grid={{ gutter: 12, lg: 4, md: 4, sm: 2, xs: 1, xxl: 3 }}
                renderItem={item => (
                    <List.Item>
                        <Product data={item} />
                    </List.Item>
                )}
            />
        );
    }
}

export default ProductList;
