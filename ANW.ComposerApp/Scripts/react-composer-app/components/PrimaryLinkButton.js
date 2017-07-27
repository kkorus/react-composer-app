import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class PrimaryLinkButton extends React.Component {
    render() {
        const { to, label } = this.props;
        return (
            <Link to={to}>
                <Button bsStyle="primary">
                    {label}
                </Button>
            </Link>
        )
    }
}

export default PrimaryLinkButton;