import '@testing-library/jest-dom'
import { describe } from 'node:test'
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react'
import ForumPage from '../app/forum/page.js'

jest.mock("../app/forum/_services/thread-service.js", () => ({
    addThread: jest.fn().mockResolvedValue({ id: "newThreadId" }), // Mock as if a new thread is successfully added
    getThreads: jest.fn().mockResolvedValue([
      { id: "thread1", title: "Thread 1", content: "Content 1", threadUid: "user123", date: "Date 1" },
      // Add more mock threads as needed
    ]),
    editThread: jest.fn(),
    deleteThread: jest.fn(),
  }));
  
  jest.mock("../app/context/AuthContext", () => ({
    UserAuth: jest.fn().mockImplementation(() => ({
      user: { displayName: "Test User", uid: "user123" },
    })),
  }));
  

describe ('ForumPage Tests', () => {
    
        beforeAll(() => {
            jest.spyOn(console, 'error').mockImplementation();
        });
    
        beforeEach(() => {
          jest.clearAllMocks();
        });
        
        it('should render the forum page', async () => {
            await act(async () => {
                render(<ForumPage />);
            });
            expect(screen.getByText('Create a Thread')).toBeInTheDocument();
        })
    
        it('should render the forum page and submit a thread with valid input', async () => {
            await act(async () => {
                render(<ForumPage />);
            });
    
            jest.spyOn(console, 'log').mockImplementation();

            const titleInput = screen.getByPlaceholderText('Title here');
            const contentInput = screen.getByPlaceholderText('Write your stuff here');
    
            fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
            fireEvent.change(contentInput, { target: { value: 'Valid Content' } });
    
            fireEvent.click(screen.getByText('CREATE THREAD'));
    
            await waitFor(() => {
                expect(console.log).toHaveBeenCalledWith('Thread Created');
            });
    
            console.log.mockRestore();
        });


        it('displays validation errors for empty title', async () => {
          await act(async () => {
            render(<ForumPage />);
          });
        
          fireEvent.click(screen.getByText('CREATE THREAD'));
        
          // Expect to see error toasts for each validation failure
          await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("The title cannot be empty.");
          });
        });

        it('displays validation errors for excessive title length', async () => {
            await act(async () => {
              render(<ForumPage />);
            });
          
            const titleInput = screen.getByPlaceholderText('Title here');
          
            // Input exceeding the limits
            fireEvent.change(titleInput, { target: { value: 'A'.repeat(101) } }); // 101 characters
          
            fireEvent.click(screen.getByText('CREATE THREAD'));
          
            // Expect to see error toasts for each validation failure
            await waitFor(() => {
              expect(console.error).toHaveBeenCalledWith("Title exceeds the maximum length of 100 characters.");
            });
          });

          it('displays validation errors for excessive content length', async () => {
            await act(async () => {
              render(<ForumPage />);
            });
          
            const titleInput = screen.getByPlaceholderText('Title here');
            const contentInput = screen.getByPlaceholderText('Write your stuff here');
          
            // Input exceeding the limits
            fireEvent.change(titleInput, { target: { value: "valid title" } }); // 101 characters
            fireEvent.change(contentInput, { target: { value: 'A'.repeat(1501) } }); // 101 characters

          
            fireEvent.click(screen.getByText('CREATE THREAD'));
          
            // Expect to see error toasts for each validation failure
            await waitFor(() => {
              expect(console.error).toHaveBeenCalledWith("Content exceeds the maximum length of 1500 characters.");
            });
          });

          it('displays validation errors for empty edit title', async () => {
            await act(async () => {
              render(<ForumPage />);
            });
      
            // Assuming there's a way to trigger the edit mode, possibly by clicking an "Edit" button
            // For example, if each thread has an edit button identified uniquely, or if there's a generic one you can access
            fireEvent.click(screen.getByText('Edit', {selector: 'button'})); 
      
            // Trigger the edit without changing the title (assuming it starts empty)
            fireEvent.click(screen.getByText('Save')); 
      
            await waitFor(() => {
              expect(console.error).toHaveBeenCalledWith("The title cannot be empty.");
            });
          });
      
          it('displays validation errors for excessive edit title length', async () => {
            await act(async () => {
              render(<ForumPage />);
            });
      
            fireEvent.click(screen.getByText('Edit', {selector: 'button'}));
      
            const editTitleInput = screen.getByPlaceholderText('New title here');
            fireEvent.change(editTitleInput, { target: { value: 'A'.repeat(101) } });
      
            fireEvent.click(screen.getByText('Save'));
      
            await waitFor(() => {
              expect(console.error).toHaveBeenCalledWith("Title exceeds the maximum length of 100 characters.");
            });
          });
      
          it('displays validation errors for excessive edit content length', async () => {
            await act(async () => {
              render(<ForumPage />);
            });
      
            fireEvent.click(screen.getByText('Edit', {selector: 'button'}));
      

            const editTitleInput = screen.getByPlaceholderText('New title here');
            fireEvent.change(editTitleInput, { target: { value: "valid title" } });

            // Assuming you can target the edit inputs directly after entering edit mode
            const editContentInput = screen.getByPlaceholderText('New content here');
            fireEvent.change(editContentInput, { target: { value: 'A'.repeat(1501) } });
      
            fireEvent.click(screen.getByText('Save'));
      
            await waitFor(() => {
              expect(console.error).toHaveBeenCalledWith("Content exceeds the maximum length of 1500 characters.");
            });
          });
          
    })  