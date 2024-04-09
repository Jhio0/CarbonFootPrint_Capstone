import '@testing-library/jest-dom'
import { describe } from 'node:test'
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react'
import ReportForm from "../app/reports/reportForm.js"
import { useLocation } from '../app/reports/LocationContext.js';
import { UserAuth } from '../app/context/AuthContext.js';
import { addReport } from '../app/reports/_services/reports-service.js';


jest.mock('../app/reports/_services/reports-service.js', () => ({
    addReport: jest.fn(),
    getReports: jest.fn(),
  }));

jest.mock('../app/reports/LocationContext.js', () => ({
    useLocation: jest.fn(),
  }));

  jest.mock('../app/context/AuthContext', () => ({
    UserAuth: jest.fn(() => ({
      user: 'mdfnsdjklanmg',
      uid: 'dkjsfhaf',
      errorOut: jest.fn(),
    })),
  }));


describe ('ReportForm Tests', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });

    it('should render the form', async () => {
        useLocation.mockReturnValue({ location: 'Canada', setLocation: jest.fn() });
        await act(async () => {
            render(<ReportForm />);
        });
        expect(screen.getByText('Submit Report')).toBeInTheDocument();
    })

    it('should render the form and submit a report with valid input', async () => {
        
        await act(async () => {
            render(<ReportForm />);
        });
        
        jest.spyOn(console, 'log').mockImplementation();

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Valid Title' } });
        fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-04-08' } });
        
        fireEvent.click(screen.getByText('Submit Report'));
        
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('Successfully added report');
        });

        console.log.mockRestore();
    });

    // Edge case test
    it('should not submit a report with title exceeding 100 characters', async () => {
        
        await act(async () => {
            render(<ReportForm />);
        });
        
        jest.spyOn(console, 'error').mockImplementation();
        
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'a'.repeat(101) } });
        fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-04-08' } });
        fireEvent.click(screen.getByText('Submit Report'));

        expect(console.error).toHaveBeenCalledWith('Title must be between 1 and 100 characters.');
        
        console.error.mockRestore();
    });

    // Empty case test
    it('should not submit a report with empty title and date', async () => {

        await act(async () => {
            render(<ReportForm />);
        });
       
        jest.spyOn(console, 'error').mockImplementation();

        fireEvent.click(screen.getByText('Submit Report'));
        expect(console.error).toHaveBeenCalledWith('Title must be between 1 and 100 characters.');
       
        console.error.mockRestore();
    });


    // Empty case test
    it('should not submit a report with empty date', async () => {
        await act(async () => {
            render(<ReportForm />);
        });
    
        jest.spyOn(console, 'error').mockImplementation();

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Valid Title' } });
        fireEvent.click(screen.getByText('Submit Report'));
        expect(console.error).toHaveBeenCalledWith('Date cannot be empty.');
        
        console.error.mockRestore();
    });

})