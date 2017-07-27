import React from 'react';
import PrimaryLinkButton from './PrimaryLinkButton';
import ComposerPanel from './ComposerPanel';
import { Alert } from 'react-bootstrap';

class ComposerDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            composer: null,
            showUserNotFoundError: false
        };
    }

    render() {
        return (
            <div>
                {this.state.composer &&
                    <ComposerPanel
                        header={this.getComposerFullName()}
                        title={this.state.composer.title}
                        awards={this.state.composer.awards}
                    />
                }
                {this.state.showUserNotFoundError &&
                    <Alert bsStyle='danger'>
                        <p>The composer that you are trying to find doesn't exist.</p>
                    </Alert>
                }
                <PrimaryLinkButton label='Back' to='/' />
            </div >
        );
    }

    getComposerFullName() {
        const fullName = `${this.state.composer.firstName} ${this.state.composer.lastName}`;
        return fullName;
    }

    componentDidMount() {
        this.props.getComposer(this.props.match.params.id).then((composer) => {
            this.setState({ composer: composer.data });
        }).catch(() => {
            this.setState({ showUserNotFoundError: true });
        });
    }
}

export default ComposerDetails;