import { Component } from '@angular/core';
import { CombinationService } from './shared/service/combination/combination.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sum = 0;
  totalDigits = 0;
  availableDigits = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  calculatedCombinations = [];

  constructor(private combinationService: CombinationService) {}

  ngOnInit(): void {
    this.calculateCombinations();
  }

  calculateCombinations(): void {
    this.calculatedCombinations = this.combinationService.getDigitCombinations(
      +this.sum,
      +this.totalDigits,
      this.availableDigits
    );
  }
}
