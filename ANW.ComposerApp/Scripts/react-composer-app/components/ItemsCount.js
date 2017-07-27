import React from 'react';

class ItemsCount extends React.Component {
    render() {
        const { items } = this.props;
        const count = items && items.length > 0 ? items.length : 0;
        return (
            <p>Count: {count}</p>
        )
    }
}

export default ItemsCount;