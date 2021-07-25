import { Injectable } from '@angular/core';

@Injectable()
export class CombinationService {
  /**
   * Calculates all available digit combinations, that can represent the passed sum with
   * the passed amount of digits and the passed available digits
   */
  getDigitCombinations(
    sum: number,
    digitPosition: number,
    availableDigits: number[]
  ): number[][] {

    // Do not handle invalid digit positions
    if (digitPosition <= 0) {
      return [];
    }

    // Store all available combinations in here
    const combinations: number[][] = [];

    // Iterate over all available digits and check for each of them
    for (let i = 0; i < availableDigits.length; i++) {
      const currentDigit = availableDigits[i];

      // @todo: Abort, if currentDigit and lower digits can't even reach the required sum

      /**
       * If the current digit is greater than the sum (or equals the sum, in case it isn't the last digit),
       * skip it and proceed with the next digit.
       */
      if (
        (digitPosition > 1 && currentDigit >= sum) ||
        (digitPosition === 1 && currentDigit > sum)
      ) {
        continue;
      }

      if (digitPosition > 1) {
        // If the digit position is not the last one

        /**
         * Fetch all combinations that are possible for the sum minus the current digit.
         * Additionally reduce the digit position and only process digits, that are
         * smaller than the current digit.
         *
         * Finally prepend the current digit to each combination and add the whole array
         * to the array of possible combinations.
         */
        combinations.push(
          ...this.getDigitCombinations(
            sum - currentDigit,
            digitPosition - 1,
            availableDigits.slice(i + 1)
          ).map(combination => [currentDigit].concat(combination))
        );
      } else if (digitPosition === 1 && currentDigit === sum) {
        // If the digit position is the last position and the current digit matches the remaining sum

        // Return the current digit as the only possible combination.
        return [[currentDigit]];
      }
    }

    // Return all available combinations
    return combinations;
  }
}
