import React from 'react'
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

test("Review view is rendered properly", async () => {

    render(<MemoryRouter><NavBar cart={[]}></NavBar></MemoryRouter>);
    expect(screen.getByAltText('DeDe logo.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Items...')).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    expect(screen.getByTestId('account-icon')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
});