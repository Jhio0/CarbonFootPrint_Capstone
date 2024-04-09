import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import {AuthLogin} from '../app/_utils/auth-login.js'
import { UserAuth } from '../app/context/AuthContext.js';

// Mocking useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// Mocking UserAuth
jest.mock('../app/context/AuthContext', () => ({
  UserAuth: jest.fn(),
}));

describe('AuthLogin Component Tests', () => {
  const mockLogin = jest.fn();
  const mockGoogleSignIn = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockLogin.mockClear();
    mockGoogleSignIn.mockClear();
    UserAuth.mockImplementation(() => ({
      onLogin: mockLogin,
      googleSignIn: mockGoogleSignIn,
    }));
    // Mocking useRouter's push function
    require('next/router').useRouter.mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('renders without crashing', () => {
    render(<AuthLogin />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('allows users to enter email and password', () => {
    render(<AuthLogin />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    expect(screen.getByPlaceholderText('Email').value).toBe('user@example.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('password');
  });

  it('calls onLogin with the email and password when login button is clicked', async () => {
    render(<AuthLogin />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password');
  });

  // it('navigates to home page on successful login', async () => {
  //   mockLogin.mockResolvedValueOnce(); // Simulate successful login
  //   render(<AuthLogin />);

  //   fireEvent.click(screen.getByText('Login'));

  //   expect(mockRouterPush).toHaveBeenCalledWith('/');
  // });

  // it('calls googleSignIn when Login With Google button is clicked', async () => {
  //   render(<AuthLogin />);

  //   fireEvent.click(screen.getByText('Login With Google'));

  //   expect(mockGoogleSignIn).toHaveBeenCalled();
  // });
});
