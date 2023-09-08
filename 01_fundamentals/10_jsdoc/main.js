/**
 * Gets the list of names.
 *
 * @returns {string[]} The array of strings.
 */
function getNames() {
  return ['Bill', 'Mark', 'Steve'];
}

/**
 * Prints names.
 *
 * @param {string[]} names The array of strings.
 */
function printNames(names) {
  names.forEach((name) => {
    console.log(name);
  });
}

printNames(getNames());
