import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme';
import ComposerDetails from '../components/ComposerDetails';
import PrimaryLinkButton from '../components/PrimaryLinkButton';
import ComposerPanel from '../components/ComposerPanel';
import { Alert } from 'react-bootstrap';

describe('ComposerDetails', () => {
    let getComposerApiCallback;
    let mountedComposerDetails;

    const mountComposerDetails = () => {
        if (!mountedComposerDetails) {
            mountedComposerDetails = mount(
                <MemoryRouter initialEntries={['/details/1']}>
                    <Route
                        path='/details/:id'
                        render={(routeProps) => <ComposerDetails {...routeProps} getComposer={getComposerApiCallback} />} />
                </MemoryRouter>
            );
        }
        
        return mountedComposerDetails;
    };

    beforeEach(() => {
        getComposerApiCallback = (id) => new Promise((resolve) => {
            resolve({
                data: {
                    id: 1,
                    firstName: 'Foo',
                    lastName: 'Bar',
                    title: 'Mr',
                    awards: 'Grammy 2017'
                }
            });
        });
        mountedComposerDetails = undefined;
    });

    describe('the rendered ComposerDetails', () => {
        it('always renders a `PrimaryLinkButton`', () => {
            expect(mountComposerDetails().find(PrimaryLinkButton).length).toBe(1);
        });
    });

    describe('when composer data is returned from api callback', () => {
        it('renders `ComposerPanel`', (done) => {
            mountComposerDetails();
            setImmediate(() => {
                expect(mountedComposerDetails.find(ComposerPanel).length).toBe(1);
                expect(mountedComposerDetails.find(Alert).length).toBe(0);
                done();
            });
        });
    });

    describe('when composer data is not found from api', () => {
        it('renders `Alert`', (done) => {
            getComposerApiCallback = (id) => new Promise((resolve, reject) => {
                reject();
            });

            mountComposerDetails();
            setImmediate(() => {
                expect(mountedComposerDetails.find(Alert).length).toBe(1);
                expect(mountedComposerDetails.find(ComposerPanel).length).toBe(0);
                done();
            });
        });
    });
});