const data = require('./data.json'); // Import the JSON data from root dir

function findDeepestValues(obj) {
    let deepestValues = {}; // This should store the deepest values for each top-level property

    // Recursive function to loop over the struct til it finds deepest value
    function recurse(o, path) {
        if (typeof o !== 'object' || o === null) { // Check if the current item is not an object
            // Get the top-level property from the current path
            const propertyKey = path.split('.')[0];
            // Check if the current depth is bigger than the prev stored depth
            if (!deepestValues[propertyKey] || path.split('.').length > deepestValues[propertyKey].depth) {
                // Store the value if this is the deepest found so far
                deepestValues[propertyKey] = { depth: path.split('.').length, values: [o] };
            } else if (path.split('.').length === deepestValues[propertyKey].depth) {
                // If the depth is the same, push to array
                deepestValues[propertyKey].values.push(o);
            }
            return;
        }
        // If the current item is an object, recurse into each property
        for (const key in o) {
            if (o.hasOwnProperty(key)) {
                recurse(o[key], path ? `${path}.${key}` : key);
            }
        }
    }

    // Iterate over each top-level property in the object
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            recurse(obj[key], key);
        }
    }

    // Return only the deepest properties. If you want the full struct just comment this return statement out
    return Object.fromEntries(
        Object.entries(deepestValues).map(([key, { values }]) => [key, values])
    );
}

module.exports = findDeepestValues; // Export the function to make it available for import
