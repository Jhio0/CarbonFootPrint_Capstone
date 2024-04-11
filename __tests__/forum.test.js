import '@testing-library/jest-dom'
import { describe } from 'node:test'
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react'
import ForumPage from '../app/forum/page.js'
import * as threadService from "../app/forum/_services/thread-service";

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
          jest.spyOn(console, 'log').mockImplementation();
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

          it('allows a user to edit a thread successfully', async () => {
            await act(async () => {
              render(<ForumPage />);
            });
        
            // Find and click the edit button for the first thread
            const editButtons = screen.getAllByText('Edit');
            fireEvent.click(editButtons[0]);
        
            // Assuming your edit form is now visible and input fields can be targeted
            const editTitleInput = screen.getByPlaceholderText('New title here');
            const editContentInput = screen.getByPlaceholderText('New content here');
        
            // Simulate typing new title and content
            fireEvent.change(editTitleInput, { target: { value: 'Updated Title' } });
            fireEvent.change(editContentInput, { target: { value: 'Updated Content' } });
        
            // Simulate submitting the edit form
            fireEvent.click(screen.getByText('Save'));
        
            // Verify the edit request was made with expected data
            await waitFor(() => {
              expect(threadService.editThread).toHaveBeenCalledWith({
                id: 'thread1', // or however you identify which thread to update
                title: 'Updated Title',
                date: 'Date 1', // or any other properties that should not be changed
                content: 'Updated Content',
                threadUid: 'user123',
                // Include any other thread properties as necessary
              });
              expect(console.log).toHaveBeenCalledWith('Thread Updated');
            });

            // Optionally verify a success message or that the UI has updated
            // e.g., expect(screen.getByText('Updated Title')).toBeInTheDocument();
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
          
          it('allows a user to delete a thread', async () => {
            // Mock the initial state to have one thread
            threadService.getThreads.mockResolvedValue([
              { id: "thread1", title: "Thread 1", content: "Content 1", threadUid: "user123", date: "Date 1" },
            ]);
          
          
            await act(async () => {
              render(<ForumPage />);
            });
          
            // Verify initial thread is rendered
            await waitFor(() => expect(screen.getByText('Thread 1')).toBeInTheDocument());
          
            // Find and click the delete button for the thread
            const deleteButton = screen.getByRole('button', { name: /Delete/i });
            fireEvent.click(deleteButton);
          
            // Optionally, if your application shows a confirmation dialog, you might need to confirm the action
            // const confirmButton = screen.getByRole('button', { name: /Confirm/i });
            // fireEvent.click(confirmButton);
          
            // Verify the thread has been deleted
            // This could be checking that the thread is no longer in the document,
            // or that a success message is shown, depending on how your app handles deletions
            await waitFor(() => {
              expect(screen.queryByText('Thread 2')).not.toBeInTheDocument();
            });
          
            // Alternatively, if there's a toast or other confirmation of deletion, you might check for that
            expect(console.log).toHaveBeenCalledWith('Thread deleted successfully');
          });
    })  