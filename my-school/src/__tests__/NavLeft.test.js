import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history'
import {render, fireEvent} from '@testing-library/react';
import NavLeft from '../Components/NavLeft';

describe('NavLeft component', () => {
    it('renders without error', () => {
        const history = createMemoryHistory()
        const {queryByAltText} = render(<Router history={history}><NavLeft /></Router>)
        expect(queryByAltText).toBeTruthy()
    })
})