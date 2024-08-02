import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor} from '@testing-library/react';
import ResponsiveAppBar from '../app/components/navbar.js';
import { UserAuth } from '../app/context/AuthContext.js';
import Page from '../app/CFCalc/page.js';
import { it } from 'node:test';

//Login
jest.mock('../app/context/AuthContext', () => ({
  UserAuth: jest.fn(() => ({
    user: 'mdfnsdjklanmg',
    uid: 'dkjsfhaf',
    errorOut: jest.fn(),
  })),
}));

describe('NavBar Tests', () => {

// beforeALL()
// Code to run before all tests in the describe block.

// beforeEach()
// Code to run before each test in the describe block.

//afterEach()
//Code to run after each tests in describe block.

//afterALL()
//Code to run after all tests in describe block.

//Verify that the ResponsiveAppBar component renders without crashing and contains the text "CFCalc". -F0011
    test('Renders navbar without crashing?', async () => {
        render(<ResponsiveAppBar />);
        await waitFor(() => {
          expect(screen.getByText(/CFCalc/i)).toBeInTheDocument();
        });
      });
    
      //Ensure that users can click on the "CFCalc" link in the navigation bar, implying navigation functionality. F0012
      test('Allows users to navigate to the calculator?', async () => {
        render(<ResponsiveAppBar />);
        await waitFor(() => {
          expect(screen.getByText(/CFCalc/i)).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText(/CFCalc/i));
        
      //Check that the "Feed" and "News" links are rendered in the navigation bar when the user is logged in. -F0013  
      test ('Are the correct links rendered when logged in?', () => {
        expect(screen.getByText(/Feed/i)).toBeInTheDocument();
        expect(screen.getByText(/News/i)).toBeInTheDocument();
      })

      //Verify that clicking the "News" button in the navigation bar triggers the handleCloseNavMenu function, indicating the menu closes on click. - F0014

      it('Does the nav menu close on click?', ()=> {
        const handleCloseNavMenu = Jest.fn();
        render(<Button onClick={handleCloseNavMenu}>News</Button>)
        const button = screen.getByText(/News/i);
        fireEvent.click(button);

        expect(handleCloseNavMenu).toHaveBeenCalledTimes(1);

      })

      //Mock Logout
      jest.mock('../app/context/AuthContext', () => ({
       UserAuth: jest.fn(() => ({
       user: 'mdfnsdjklanmg',
       logOut: jest.fn(),
       })),
      }));

      //Ensure that the "News", "Login", and "Signup" links are rendered in the navigation bar, in the context of a logged-out user. F-0015
      test ('Are the correct links rendered?', () => {
        expect(screen.getByText(/News/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/Signup/i)).toBeInTheDocument();
      })
      });
  });   