import '@testing-library/jest-dom'
import UserCalc from '../app/CFCalc/UserCalc.js'
import { describe } from 'node:test'
import { render, fireEvent, findByRole, screen, waitFor, beforeEach } from '@testing-library/react'

require('dotenv').config();

import 'react-toastify/dist/ReactToastify.css';

jest.mock('../app/CFCalc/EmissionsDonutChart', () => () => <div>MockEmissionChart</div>);

jest.mock('../app/CFCalc/CalcAI', () => ({
    __esModule: true,
    default: () => <div>Mocked AIClimateRecommendation Component</div>,
  }));


describe('UserCalc', () => {

    // inital render test
    it('renders without crashing', () => {
       render(<UserCalc />);
    });

    it('calculates emissions correctly with valid inputs', async () => {
        const { getByText, getByLabelText } = render(<UserCalc />);
        jest.spyOn(console, 'log').mockImplementation();


        await fireEvent.click(screen.getByText('Location'));

        // Assuming your select has a label associated with it; if not, you may need to use getByTestId or another query
        await fireEvent.click(screen.getByText('Country')); // Adjust the label text as necessary
        await fireEvent.click(screen.getByText('Canada')); // Adjust the label text as necessary

        const regionDropdown = getByLabelText('Region');
    
        // Click on the region dropdown to open the options
        await fireEvent.click(regionDropdown);
    
        // Find and click on the option for "Alberta (AB)"
        const albertaOption = getByText('Alberta (AB)');
        await fireEvent.click(albertaOption);
        
        await waitFor(() => {
            expect(screen.getByText('Alberta (AB)')).toBeInTheDocument();
          });
          
        await fireEvent.click(albertaOption);
        // navigate to home emissions tab
        await fireEvent.click(screen.getByText('Home'));

        const electricityInput = screen.getByPlaceholderText('Electricity used (kWh)');
        const naturalGasInput = screen.getByPlaceholderText('Natural gas used (GJ)');

        fireEvent.change(electricityInput, { target: { value: '12341' } });
        fireEvent.change(naturalGasInput, { target: { value: '21341' } });

        fireEvent.click(getByText('Calculate'));

        expect(console.log).toHaveBeenCalledWith("Successful Calculation!");
        console.log.mockRestore();
      
    });

    it('handles empty inputs gracefully', async () => {
        render(<UserCalc />);
        jest.spyOn(console, 'log').mockImplementation();
        await fireEvent.click(screen.getByText('Home'));
      
        // Attempt to calculate without filling inputs
        fireEvent.click(screen.getByText('Calculate'));
      
        expect(console.log).toHaveBeenCalledWith("Both electricity and gas inputs must be provided for calculations.");
        console.log.mockRestore();
      });
      
      it('handles invalid inputs gracefully', async () => {
        render(<UserCalc />);
        jest.spyOn(console, 'log').mockImplementation();
        await fireEvent.click(screen.getByText('Home'));
      
        const electricityInput = screen.getByPlaceholderText('Electricity used (kWh)');
        const naturalGasInput = screen.getByPlaceholderText('Natural gas used (GJ)');
      
        // Provide invalid (negative) inputs
        fireEvent.change(electricityInput, { target: { value: '-123' } });
        fireEvent.change(naturalGasInput, { target: { value: '-456' } });
      
        fireEvent.click(screen.getByText('Calculate'));
      
        // Check for error message
        expect(console.log).toHaveBeenCalledWith("Both electricity and gas inputs must be provided for calculations.");
        console.log.mockRestore();
      });

      it('handles empty region input gracefully', async () => {
        render(<UserCalc />);
        jest.spyOn(console, 'log').mockImplementation();
        await fireEvent.click(screen.getByText('Home'));
      
        const electricityInput = screen.getByPlaceholderText('Electricity used (kWh)');
        const naturalGasInput = screen.getByPlaceholderText('Natural gas used (GJ)');
      
        // Provide invalid (negative) inputs
        fireEvent.change(electricityInput, { target: { value: '2345' } });
        fireEvent.change(naturalGasInput, { target: { value: '2345' } });
      
        fireEvent.click(screen.getByText('Calculate'));
      
        // Check for error message
        expect(console.log).toHaveBeenCalledWith("Please select a region before calculating emissions.");
        console.log.mockRestore();
      });

      it('selects a province/state from the dropdown menu', async () => {
        const { getByText, getByLabelText } = await render(<UserCalc />);
        
        // Navigate to the Location tab
        await fireEvent.click(screen.getByText('Location'));
    
        // Assuming your select has a label associated with it; if not, you may need to use getByTestId or another query
        await fireEvent.click(screen.getByText('Country')); // Adjust the label text as necessary
        await fireEvent.click(screen.getByText('Canada')); // Adjust the label text as necessary
    
        // Get the region dropdown
        const regionDropdown = getByLabelText('Region');
        
        // Click on the region dropdown to open the options
        await fireEvent.click(regionDropdown);
    
        // Find and click on the option for "Alberta (AB)"
        const albertaOption = getByText('Alberta (AB)');
        fireEvent.click(albertaOption);
        
        // Check if the region state has been updated
        expect(screen.getByText('Alberta (AB)')).toBeInTheDocument();
    });
      
})