// jest-setup.js

// Ensure all necessary imports are defined at the beginning of the file
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Properly mock the firebase/app module
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn().mockReturnValue({}),
}));

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn().mockReturnValue({}),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: {
      uid: '123',
      email: 'test@example.com',
    },
  }),
  onAuthStateChanged: jest.fn(),
}));

// Mock OpenAI (if used in your project)
jest.mock('openai', () => ({
  __esModule: true, // This is correct for mocking ES module default exports
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'Mocked response' } }],
        }),
      },
    },
  })),
}));

