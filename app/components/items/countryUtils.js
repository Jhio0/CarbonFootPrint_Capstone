// countryUtils.js
const countryCodeToName = (countryCode) => {
    switch (countryCode) {
        case 'CAN':
            return 'Canada';
        case 'USA':
            return 'United States';
        case 'MEX':
            return 'Mexico';
        case 'ATG':
            return 'Antigua and Barbuda';
        case 'BHS':
            return 'Bahamas';
        case 'BRB':
            return 'Barbados';
        case 'BLZ':
            return 'Belize';
        case 'CRI':
            return 'Costa Rica';
        case 'CUB':
            return 'Cuba';
        case 'DMA':
            return 'Dominica';
        case 'DOM':
            return 'Dominican Republic';
        case 'SLV':
            return 'El Salvador';
        case 'GRD':
            return 'Grenada';
        case 'GTM':
            return 'Guatemala';
        case 'HTI':
            return 'Haiti';
        case 'HND':
            return 'Honduras';
        case 'JAM':
            return 'Jamaica';
        case 'NIC':
            return 'Nicaragua';
        case 'PAN':
            return 'Panama';
        case 'KNA':
            return 'Saint Kitts and Nevis';
        case 'LCA':
            return 'Saint Lucia';
        case 'VCT':
            return 'Saint Vincent and the Grenadines';
        case 'TTO':
            return 'Trinidad and Tobago';
        default:
            return countryCode; // Return code itself if not found
    }
};

const countryCodes = [
    'CAN', 'USA', 'MEX', 'ATG', 'BHS', 'BRB', 'BLZ', 'CRI', 'CUB', 'DMA', 'DOM', 
    'SLV', 'GRD', 'GTM', 'HTI', 'HND', 'JAM', 'NIC', 'PAN', 'KNA', 'LCA', 'VCT', 'TTO'
]; // Removed the duplicates

export { countryCodeToName, countryCodes };