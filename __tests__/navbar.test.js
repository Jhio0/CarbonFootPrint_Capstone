import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor} from '@testing-library/react';
import ResponsiveAppBar from '../app/components/navbar.js';

jest.mock('../app/context/AuthContext', () => ({
    UserAuth: jest.fn(() => ({
      user: 'mdfnsdjklanmg',
      logOut: jest.fn(),
    })),
  }));

describe('NavBar Tests', () => {
    test('renders navbar without crashing', async () => {
        render(<ResponsiveAppBar />);
        await waitFor(() => {
          expect(screen.getByText(/CFCalc/i)).toBeInTheDocument();
        });
      });
    
      test('allows users to navigate to the calculator', async () => {
        render(<ResponsiveAppBar />);
        await waitFor(() => {
          expect(screen.getByText(/CFCalc/i)).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText(/CFCalc/i));
      });
    // Add more test cases as needed
  });   