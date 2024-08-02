// __mocks__/firebase/auth.js

const mockGetAuth = jest.fn(() => ({
    // Add any methods you need to mock here
  }));
  
  // Mock the getAuth function
  export const getAuth = mockGetAuth;
  