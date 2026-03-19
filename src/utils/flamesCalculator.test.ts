/**
 * TEST CASES FOR FLAMES ALGORITHM
 *
 * These tests validate the correct implementation of the FLAMES algorithm
 * following the proper specification for character removal and elimination.
 */

// Test Case 1: "arun" and "anita"
// Expected: Friends (F)
//
// Step-by-step:
// Name1: "arun" → ['a', 'r', 'u', 'n']
// Name2: "anita" → ['a', 'n', 'i', 't', 'a']
//
// Remove common characters:
// - Remove 'a': arr1=['r','u','n'], arr2=['n','i','t','a']
// - Remove 'n': arr1=['r','u'], arr2=['i','t','a']
//
// Remaining count: 2 + 3 = 5
//
// FLAMES elimination with count=5:
// flames=['F','L','A','M','E','S'], index=0
// iter1: idx=(0+5-1)%6=4 → remove 'E' → ['F','L','A','M','S']
// iter2: idx=(4+5-1)%5=3 → remove 'M' → ['F','L','A','S']
// iter3: idx=(3+5-1)%4=3 → remove 'S' → ['F','L','A'], adjust to 0
// iter4: idx=(0+5-1)%3=1 → remove 'L' → ['F','A']
// iter5: idx=(1+5-1)%2=1 → remove 'A' → ['F']
// Result: F = Friends ✓

const testCase1Name1 = "arun";
const testCase1Name2 = "anita";
const testCase1Result = calculateFlames(testCase1Name1, testCase1Name2);
const testCase1Expected = "F";
console.log(
  `Test 1 (${testCase1Name1} + ${testCase1Name2}): ${testCase1Result} (Expected: ${testCase1Expected}) ${testCase1Result === testCase1Expected ? "✓ PASS" : "✗ FAIL"}`,
);

// Test Case 2: "alice" and "bob"
// Expected: Affection (A)
//
// Step-by-step:
// Name1: "alice" → ['a','l','i','c','e']
// Name2: "bob" → ['b','o','b']
//
// Remove common characters:
// - Remove 'b': arr1=['a','l','i','c','e'], arr2=['o','b'] (no 'b' in arr1, skip)
// - Check 'a': not in arr2
// - Check 'l': not in arr2
// - Check 'i': not in arr2
// - Check 'c': not in arr2
// - Check 'e': not in arr2
//
// Remaining count: 5 + 3 = 8
//
// FLAMES elimination with count=8:
// flames=['F','L','A','M','E','S'], index=0
// iter1: idx=(0+8-1)%6=1 → remove 'L' → ['F','A','M','E','S']
// iter2: idx=(1+8-1)%5=3 → remove 'E' → ['F','A','M','S']
// iter3: idx=(3+8-1)%4=2 → remove 'M' → ['F','A','S']
// iter4: idx=(2+8-1)%3=0 → remove 'F' → ['A','S']
// iter5: idx=(0+8-1)%2=1 → remove 'S' → ['A']
// Result: A = Affection ✓

const testCase2Name1 = "alice";
const testCase2Name2 = "bob";
const testCase2Result = calculateFlames(testCase2Name1, testCase2Name2);
const testCase2Expected = "A";
console.log(
  `Test 2 (${testCase2Name1} + ${testCase2Name2}): ${testCase2Result} (Expected: ${testCase2Expected}) ${testCase2Result === testCase2Expected ? "✓ PASS" : "✗ FAIL"}`,
);

// Test Case 3: Edge case - identical names (all characters match)
// Names: "anna" and "anna"
// Expected: null (no remaining characters)

const testCase3Name1 = "anna";
const testCase3Name2 = "anna";
const testCase3Result = calculateFlames(testCase3Name1, testCase3Name2);
const testCase3Expected = null;
console.log(
  `Test 3 (${testCase3Name1} + ${testCase3Name2}): ${testCase3Result} (Expected: ${testCase3Expected}) ${testCase3Result === testCase3Expected ? "✓ PASS" : "✗ FAIL"}`,
);

// VALIDATION SUMMARY
console.log("\n=== FLAMES Algorithm Test Results ===");
console.log(
  `Test 1: ${testCase1Result === testCase1Expected ? "PASS" : "FAIL"}`,
);
console.log(
  `Test 2: ${testCase2Result === testCase2Expected ? "PASS" : "FAIL"}`,
);
console.log(
  `Test 3: ${testCase3Result === testCase3Expected ? "PASS" : "FAIL"}`,
);
