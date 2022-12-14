import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../services/api.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  coinData: any;
  coinId!: string;
  days: number = 1;
  currency: string = "USD";
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#5994ee',
        pointBackgroundColor: '#5994ee',
        pointBorderColor: '#5994ee',
        pointHoverBackgroundColor: '#5994ee',
        pointHoverBorderColor: '#5994ee',

      }
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 0
      },
      line: {
        borderWidth: 2
      }
    },
    plugins: {
      legend: { 
        display: false
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#8990c5',
        },
        grid: {
          display: false,
        }
      },
      y: {
        ticks: {
          color: '#8990c5',
          callback: function(value) {
            return '$' + value;
          },
        },
        grid: {
          color: '#8990c51a'
        }
      }
    },
  };
  
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api:ApiService, private activatedRoute:ActivatedRoute, private currencyService:CurrencyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.coinId = val['id'];
    });
    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency()
    .subscribe(val=>{
      this.currency = val;
      this.getGraphData(this.days);
      this.getCoinData();
    })
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId)
    .subscribe(res => {

      console.log(this.coinData);
      if(this.currency === "USD"){
        res.market_data.current_price.inr = res.market_data.current_price.usd;
        res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.inr = res.market_data.current_price.inr;
      res.market_data.market_cap.inr = res.market_data.market_cap.inr;
      this.coinData = res;
    })
  }

  getGraphData(days:number) {
    this.days = days
    this.api.getGrpahicalCurrencyData(this.coinId,this.currency,this.days)
    .subscribe(res=>{
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = res.prices.map((a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }
}
