import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss']
})
export class CurrencySelectComponent {
  selectedCurrency : string = "USD";
  constructor(private currencyService : CurrencyService) { }

  sendCurrency(event:string){
    this.currencyService.setCurrency(event);
  }
}
