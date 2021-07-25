import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sum = 10;
  totalDigits = 2;
  availableDigits = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  calculatedCombinations = [];

  ngOnInit(): void {
    // this.calculateCombinations();
  }

  calculateCombinations(): void {
    const combinations = [];
    const availableDigits = this.availableDigits.slice();

    let combinationFound = false;
    do {
      let remainingSum = this.sum;
      const currentCombination = [];

      for (let digitCount = this.totalDigits; digitCount > 0; digitCount--) {
        console.log('digitCount', digitCount);
        console.log('availableDigits', availableDigits);

        for (
          let digitIndex = 0;
          digitIndex < availableDigits.length;
          digitIndex++
        ) {
          const currentDigit = availableDigits[digitIndex];
          if (
            (digitCount > 1 && currentDigit >= remainingSum) ||
            (digitCount === 1 && currentDigit > remainingSum)
          ) {
            continue;
          }

          console.log('digit', currentDigit);

          if (currentDigit <= remainingSum + currentDigit) {
            currentCombination.push(currentDigit);
            remainingSum -= currentDigit;
            break;
          }
        }

        if (currentCombination.length === 0 && digitCount > 0) {
          break;
        }
      }

      let combinationAlreadyExists = combinations.find(combination => {
        return this.arraysEqual(combination, currentCombination);
      });

      console.log('combinationAlreadyExists', combinationAlreadyExists);

      if (combinationAlreadyExists) {
        availableDigits.splice(0, 1);
      }

      if (remainingSum === 0) {
        combinations.push(currentCombination);
      }
    } while (combinationFound === true);

    console.log('currentCombination', currentCombination);

    this.calculatedCombinations = combinations;

    /*for (let digitsCounter = 1; digitsCounter <= this.digits; digitsCounter++) {

      for (let digitIndex = 0; digitIndex < this.availableDigits.length; digitIndex++) {

        for (let digitIndex2 = 0; digitIndex2 < this.availableDigits.length; digitIndex2++) {

          

        }

      }

    }*/

    /*let combinationFound = false;
    do {

      let remainingSum = this.sum;
      for (let digitsCounter = 1; digitsCounter <= this.digits; digitsCounter++) {
        let remainingDigits = this.digitCols.slice();

        for (let i = 0; i < this.digitCols.length; i++) {
          
        }
      }

    } while (combinationFound = true);*/
  }

  private calculateArraySum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  }

  private arraysEqual(a: number[], b: number[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}
