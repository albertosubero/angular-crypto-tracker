import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {
  currency: string = "USD";
  coinsData: any[] = [];
  copyCoinsData: any[] = [];
  constructor(private api: ApiService, private currencyService : CurrencyService, private router : Router) { }

  ngOnInit(): void {
    this.getAllData();
    this.currencyService.getCurrency()
    .subscribe(val=>{
      this.currency = val;
      this.getAllData();
    })
  }

  private getAllData() {
    this.api.getCurrency(this.currency)
      .subscribe(res => {
        this.coinsData = res;
        this.copyCoinsData = [...this.coinsData];
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const targetValue: any[] = [];
    this.copyCoinsData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(filterValue)) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.coinsData = targetValue;
  }

  gotoDetails(id: string) {
    this.router.navigate(['coin-detail', id]);
  }
}
