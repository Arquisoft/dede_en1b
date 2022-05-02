import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

test("Review view is rendered properly", async () => {

    render(<MemoryRouter><PageNotFound/></MemoryRouter>);
    expect(screen.getByText("SORRY")).toBeInTheDocument();
    expect(screen.getByText("We couldn't find the page you're looking for!!")).toBeInTheDocument();
});