function findIndices(nums, target) {
    const indicesMap = new Map(); // To store the indices of elements we have seen

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]; // Calculate the complement that would sum to the target

        // Check if the complement exists in the map (i.e., we have already seen the complement)
        if (indicesMap.has(complement)) {
            // If found, return the indices of the current element and its complement
            console.log(`Indices: [${indicesMap.get(complement)}, ${i}]`);
            return [indicesMap.get(complement), i];
        }

        // Otherwise, store the current element and its index in the map
        indicesMap.set(nums[i], i);
    }

    console.log("No two elements sum up to the target.");
    return null;
}

// Example usage:
const numbers = [2, 7, 11, 15];
const target = 9;

findIndices(numbers, target); // Output: Indices: [0, 1]
