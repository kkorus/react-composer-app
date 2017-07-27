import React from 'react';
import { Panel } from 'react-bootstrap';

class ComposerPanel extends React.Component {
    render() {
        const { header, title, awards } = this.props;
        return (
            <Panel header={header} bsStyle='primary'>
                <div>
                    <div className='col-md-6'>
                        <h3>Title:</h3>
                        <p>{title}</p>
                    </div>
                    <div className='col-md-6'>
                        <h3>Awards:</h3>
                        <p>{awards}</p>
                    </div>
                </div>
            </Panel>
        );
    }
}

export default ComposerPanel;