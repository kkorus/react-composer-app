import React from 'react';
import { Table } from 'react-bootstrap';
import ComposersListItem from './ComposersListItem';
import ItemsCount from './ItemsCount';

class ComposersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            composers: []
        };
    }

    render() {
        return (
            <div>
                <ItemsCount items={this.state.composers} />
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th className='col-md-1'></th>
                            <th className='col-md-11'>Composer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.composers.map((composer) => {
                            return <ComposersListItem key={composer.id} composer={composer} />
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

    componentDidMount() {
        this.props.getComposers().then((composers) =>
            this.setState({ composers: composers.data })
        );
    }
}

export default ComposersList;