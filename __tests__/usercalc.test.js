// import '@testing-library/jest-dom'
// import UserCalc from '../app/CFCalc/UserCalc.js'
// import { describe } from 'node:test'
// import { render, fireEvent } from '@testing-library/react'

// require('dotenv').config();


// describe('UserCalc', () => {
//     // inital render test
//     it('renders without crashing', () => {
//         render(<UserCalc />);
//       });

//     it('calculates emissions correctly with valid inputs', async () => {
//     const { getByPlaceholderText, getByText } = render(<UserCalc />);
//     // Assuming your select has a label associated with it; if not, you may need to use getByTestId or another query
//     const countrySelect = await findByRole('combobox', { name: /Country/ });
//     fireEvent.change(countrySelect, { target: { value: 'Canada' } });

//     // For regions, the selection might depend on the country being selected first
//     // so you might need to wait for the regions to be loaded or for the select to be updated.
//     // This example uses getByLabelText, adjust according to your actual labels
//     // You may also need to use findByLabelText if the update is asynchronous
//     const regionSelect = getByLabelText('Region'); // Adjust the label text as necessary
//     fireEvent.change(regionSelect, { target: { value: 'Alberta (AB)' } });
    
    
//     await fireEvent.click(getByText('Home'));

//     const electricityInput = getByPlaceholderText('Electricity used (kWh)');
//     const naturalGasInput = getByPlaceholderText('Natural gas used (GJ)');

//     fireEvent.change(electricityInput, { target: { value: '12341' } });
//     fireEvent.change(naturalGasInput, { target: { value: '21341' } });

//     fireEvent.click(getByText('Calculate'));

//     // Add assertions to verify that emissions are calculated correctly
//     // You can use getByText or other query methods to find elements and check their content
//     });

//     it('handles empty inputs gracefully', () => {
//     const { getByText } = render(<UserCalc />);
//     fireEvent.click(getByText('Calculate'));

//     // Add assertions to verify that appropriate error messages or behavior is displayed
//     });

//     it('handles invalid inputs gracefully', () => {
//     const { getByPlaceholderText, getByText } = render(<UserCalc />);
//     const electricityInput = getByPlaceholderText('Electricity used (kWh)');
//     const naturalGasInput = getByPlaceholderText('Natural gas used (GJ)');

//     fireEvent.change(electricityInput, { target: { value: 'invalid' } });
//     fireEvent.change(naturalGasInput, { target: { value: '-10' } });

//     fireEvent.click(getByText('Calculate'));

//     // Add assertions to verify that appropriate error messages or behavior is displayed
//     });
// })