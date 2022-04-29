import React from 'react';
import {render, screen } from '@testing-library/react';
import DeveloperCards from './DeveloperCards';

test("DevelopersCard is rendered properly", async () =>{

        render(<DeveloperCards></DeveloperCards>);
        expect(screen.getByText('Luis Miguel Alonso Ferreiro')).toBeInTheDocument();
        expect(screen.getByText('Sebastián López Hernández')).toBeInTheDocument();
        expect(screen.getByText('Jesús González Méndez')).toBeInTheDocument();
        expect(screen.getByText('Miguel Cuesta Martínez')).toBeInTheDocument();
        expect(screen.getByText('Daniel Álvarez Díaz')).toBeInTheDocument();

});




