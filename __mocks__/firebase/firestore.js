// __mocks__/firebase/firestore.js

// Mocks for document reference and setDoc function
const mockDoc = jest.fn();
const mockSetDoc = jest.fn();

// Mock implementations
mockDoc.mockReturnValue({
  // Return a mock document reference
  set: mockSetDoc,  // Mock setting a document (you can chain then/catch if needed)
});

// Exported functions from firebase/firestore
export const doc = mockDoc;
export const setDoc = mockSetDoc;

// Mock the getFirestore function (if necessary)
export const getFirestore = jest.fn();
