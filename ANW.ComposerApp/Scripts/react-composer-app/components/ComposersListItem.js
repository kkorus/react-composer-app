import React, { PropTypes } from 'react';
import PrimaryLinkButton from './PrimaryLinkButton';

class ComposersListItem extends React.Component {
    render() {
        const {
            id,
            firstName,
            lastName
         } = this.props.composer;
        const detailsRoute = `/details/${id}`;
        return (
            <tr>
                <td>
                    <PrimaryLinkButton label='Details' to={detailsRoute} />
                </td>
                <td>{firstName} {lastName}</td>
            </tr>
        );
    }
}

export default ComposersListItem;