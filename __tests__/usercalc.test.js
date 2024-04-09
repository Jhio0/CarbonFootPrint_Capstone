import '@testing-library/jest-dom'
import UserCalc from '../app/CFCalc/UserCalc.js'
import { describe } from 'node:test'
import { render, fireEvent, screen } from '@testing-library/react'

require('dotenv').config();

import 'react-toastify/dist/ReactToastify.css';

jest.mock('../app/CFCalc/EmissionsDonutChart', () => () => <div>MockEmissionChart</div>);

jest.mock('../app/CFCalc/CalcAI', () => ({
    __esModule: true,
    default: () => <div>Mocked AIClimateRecommendation Component</div>,
  }));

jest.mock('../app/CFCalc/AirpotMapRoutin', () => () => <div>Mocked AirportMapRouting Component</div>);
jest.mock('../app/CFCalc/MapRouting', () => () => <div>Mocked MapRouting Component</div>);

describe('UserCalc', () => {

    // inital render test
    it('renders without crashing', () => {
       render(<UserCalc />);
    });

    it('calculates emissions correctly with valid inputs', async () => {
        const { getByText, getByLabelText, getByRole } = render(<UserCalc />);
        jest.spyOn(console, 'log').mockImplementation();


        await fireEvent.click(screen.getByText('Location'));

        // Assuming your select has a label associated with it; if not, you may need to use getByTestId or another query
        await fireEvent.click(screen.getByText('Country')); // Adjust the label text as necessary
        await fireEvent.click(screen.getByText('Canada')); // Adjust the label text as necessary

    
        // Click on the region dropdown to open the options
        const regionSelect = screen.getByRole('combobox', { name: 'Region' });
        expect(regionSelect).not.toBeDisabled();
    
        // Select an option
        fireEvent.change(regionSelect, { target: { value: 'Alberta (AB)' } });
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

    it('full test', async () => {
      const { getByText, getByLabelText, getByRole } = render(<UserCalc />);
      jest.spyOn(console, 'log').mockImplementation();


      await fireEvent.click(screen.getByText('Location'));

      // Assuming your select has a label associated with it; if not, you may need to use getByTestId or another query
      await fireEvent.click(screen.getByText('Country')); // Adjust the label text as necessary
      await fireEvent.click(screen.getByText('Canada')); // Adjust the label text as necessary

  
      // Click on the region dropdown to open the options
      const regionSelect = screen.getByRole('combobox', { name: 'Region' });
      expect(regionSelect).not.toBeDisabled();
  
      // Select an option
      fireEvent.change(regionSelect, { target: { value: 'Alberta (AB)' } });
      // navigate to home emissions tab
      await fireEvent.click(screen.getByText('Home'));

      const electricityInput = screen.getByPlaceholderText('Electricity used (kWh)');
      const naturalGasInput = screen.getByPlaceholderText('Natural gas used (GJ)');

      fireEvent.change(electricityInput, { target: { value: '12341' } });
      fireEvent.change(naturalGasInput, { target: { value: '21341' } });

      fireEvent.click(getByText('Calculate'));

      expect(console.log).toHaveBeenCalledWith("Successful Calculation!");

      fireEvent.click(screen.getByText('Flights'));

      const flightOrigin = screen.getByPlaceholderText('Enter Origin IATA Code');
      const flightDestination = screen.getByPlaceholderText('Destination Origin IATA Code');

      fireEvent.change(flightOrigin, { target: { value: 'YYZ' } });
      fireEvent.change(flightDestination, { target: { value: 'LAX' } });
      
      fireEvent.click(getByText('Add Flight'));

      expect(screen.getByText(/Flight: YYZ to LAX/i)).toBeInTheDocument();

      fireEvent.click(screen.getByText('Vehicle'));

      const vehicleType = screen.getByRole('combobox', { name: 'Vehicle Type' });
      expect(vehicleType).not.toBeDisabled();
  
      // Select an option
      fireEvent.change(vehicleType, { target: { value: 'Car' } });

      const mileageInput = screen.getByPlaceholderText('Enter Mileage in Km');

      fireEvent.change(mileageInput, { target: { value: '213412' } });

      fireEvent.click(getByText('Calculate'));

      expect(console.log).toHaveBeenCalledWith("Vehicle emissions calculated");

      console.log.mockRestore();
    });

    it('test vehicle calculator', async () => {

      jest.spyOn(console, 'log').mockImplementation();
      const { getByText } = render(<UserCalc />);

      fireEvent.click(screen.getByText('Vehicle'));

      const vehicleType = screen.getByRole('combobox', { name: 'Vehicle Type' });
      expect(vehicleType).not.toBeDisabled();
  
      // Select an option
      fireEvent.change(vehicleType, { target: { value: 'Car' } });

      const mileageInput = screen.getByPlaceholderText('Enter Mileage in Km');

      fireEvent.change(mileageInput, { target: { value: '21341' } });

      fireEvent.click(getByText('Calculate'));

      expect(console.log).toHaveBeenCalledWith("Vehicle emissions calculated");
    })

    it('handles negative mileage input gracefully', async () => {
      jest.spyOn(console, 'error').mockImplementation();
    
      const { getByText, getByPlaceholderText, getByRole } = render(<UserCalc />);
    
      fireEvent.click(getByText('Vehicle'));
    
      const vehicleType = getByRole('combobox', { name: 'Vehicle Type' });
      fireEvent.change(vehicleType, { target: { value: 'Car' } });
    
      const mileageInput = getByPlaceholderText('Enter Mileage in Km');
      fireEvent.change(mileageInput, { target: { value: '-100' } });
    
      fireEvent.click(getByText('Calculate'));
    
      expect(console.error).toHaveBeenCalledWith("Mileage cannot be less than 0.");
    });
    
    it('prevents calculation with mileage values exceeding 8 digits', async () => {
      jest.spyOn(console, 'error').mockImplementation();
    
      const { getByText, getByPlaceholderText, getByRole } = render(<UserCalc />);
    
      fireEvent.click(getByText('Vehicle'));
    
      const vehicleType = getByRole('combobox', { name: 'Vehicle Type' });
      fireEvent.change(vehicleType, { target: { value: 'Car' } });
    
      const mileageInput = getByPlaceholderText('Enter Mileage in Km');
      // Enter a value with more than 8 digits
      fireEvent.change(mileageInput, { target: { value: '123456789' } });
    
      fireEvent.click(getByText('Calculate'));
    
      // Assuming your logic logs an error and shows a toast for invalid input
      expect(console.error).toHaveBeenCalledWith("Mileage cannot exceed 8 digits.");
    });
    
    it('allows adding a flight with a valid IATA code', async () => {
      jest.spyOn(console, 'log').mockImplementation();
      render(<UserCalc />);
    
      // Navigate to the Flights tab
      await fireEvent.click(screen.getByText('Flights'));
    
      // Assuming your UI provides input fields for origin and destination codes
      const flightOrigin = screen.getByPlaceholderText('Enter Origin IATA Code');
      const flightDestination = screen.getByPlaceholderText('Destination Origin IATA Code');
    
      // Enter valid IATA codes
      fireEvent.change(flightOrigin, { target: { value: 'YYZ' } });
      fireEvent.change(flightDestination, { target: { value: 'LAX' } });
      
      // Add flight
      await fireEvent.click(screen.getByText('Add Flight'));
    
      // Assuming a successful addition results in a log message or UI update
      expect(screen.getByText(/Flight: YYZ to LAX/i)).toBeInTheDocument();
      expect(console.log).toHaveBeenCalledWith("All airport codes are valid. Calculating Emissions.");
    });

    it('displays an error for an invalid flight IATA code input', async () => {
      render(<UserCalc />);
      jest.spyOn(console, 'error').mockImplementation();
    
      // Navigate to the Flights tab
      await fireEvent.click(screen.getByText('Flights'));
    
      // Enter an invalid IATA code (more than 3 letters)
      const flightOrigin = screen.getByPlaceholderText('Enter Origin IATA Code');
      const flightDestination = screen.getByPlaceholderText('Destination Origin IATA Code');

      fireEvent.change(flightOrigin, { target: { value: 'DSFAS' } });
      fireEvent.change(flightDestination, { target: { value: 'ASDGAS' } });
    
      // Attempt to add flight
      await fireEvent.click(screen.getByText('Add Flight'));
    
      // Verify that an error toast message is displayed
      expect(console.error).toHaveBeenCalledWith("One or more airport codes are invalid");
    });
    
})