import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme';
import ComposersList from '../components/ComposersList';
import ComposersListItem from '../components/ComposersListItem';
import ItemsCount from '../components/ItemsCount';

describe('ComposersList', () => {
    let getComposersApiCallback;
    let mountedComposersList;

    const mountComposerDetails = () => {
        if (!mountedComposersList) {
            mountedComposersList = mount(
                <MemoryRouter initialEntries={['/']}>
                    <Route
                        path='/'
                        render={(routeProps) => <ComposersList {...routeProps} getComposers={getComposersApiCallback} />} />
                </MemoryRouter>
            );
        }
        
        return mountedComposersList;
    };

    beforeEach(() => {
        getComposersApiCallback = (id) => new Promise((resolve) => {
            resolve({
                data: [{
                    id: 1,
                    firstName: 'Foo',
                    lastName: 'Bar',
                    title: 'Mr',
                    awards: 'Grammy 2017'
                },
                {
                    id: 2,
                    firstName: 'Fizz',
                    lastName: 'Buzz',
                    title: 'Ms',
                    awards: 'Grammy 2016'
                }]
            });
        });
        mountedComposersList = undefined;
    });

    describe('the rendered ComposerDetails', () => {
        it('always renders a `ItemsCount`', () => {
            expect(mountComposerDetails().find(ItemsCount).length).toBe(1);
        });
    });

    describe('when composers data is returned from api callback', () => {
        it('renders list of `ComposerListItem`', (done) => {
            mountComposerDetails();
            setImmediate(() => {
                expect(mountedComposersList.find(ComposersListItem).length).toBe(2);
                done();
            });
        });
    });
});