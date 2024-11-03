// option 1
function getUniqueCombinations(arr, k) {
  const result = [];
  const n = arr.length;

  if (k > n || k <= 0) {
    return result;
  }
  if (k === n) {
    return [arr];
  }

  const combination = new Array(k);

  function backtrack(start, depth) {
    if (depth === k) {
      result.push([...combination]);
      return;
    }
    for (let i = start; i < n; i++) {
      combination[depth] = arr[i];
      backtrack(i + 1, depth + 1);
    }
  }

  backtrack(0, 0);
  return result;
}

//option 2
function getUniqueCombinations2(arr, n) {
  const result = [];
  const totalCombinations = Math.pow(2, arr.length);

  for (let i = 0; i < totalCombinations; i++) {
    const path = [];

    for (let j = 0; j < arr.length; j++) {
      if (Math.floor(i / Math.pow(2, j)) % 2 !== 0) {
        path.push(arr[j]);
      }
    }

    if (path.length === n) {
      result.push([...path]);
    }
  }

  return result;
}

//option 3
function getUniqueCombinations3(arr, k) {
  const result = [];
  const n = arr.length;

  if (k > n || k <= 0) {
    return result;
  }
  if (k === n) {
    return [arr];
  }

  let stack = [];
  for (let i = 0; i < k; i++) {
    stack.push(i);
  }

  while (stack.length > 0) {
    result.push(stack.map((index) => arr[index]));

    let move = k - 1;
    while (move >= 0 && stack[move] === n - k + move) {
      move--;
    }

    if (move >= 0) {
      stack[move]++;
      for (let i = move + 1; i < k; i++) {
        stack[i] = stack[i - 1] + 1;
      }
    } else {
      break;
    }
  }

  return result;
}

export {
  getUniqueCombinations,
  getUniqueCombinations2,
  getUniqueCombinations3,
};
