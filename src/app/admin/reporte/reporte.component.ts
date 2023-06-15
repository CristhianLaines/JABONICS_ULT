import { Component, OnInit } from '@angular/core';
import { groupBy, groupByToMap } from 'src/app/commons/utils/group-by';
import { VentasHttp } from '../commons/http/ventas.http';
import { IReporteMonthly } from '../commons/interfaces/reporte.interface';
import { ISelectGenerico } from '../commons/interfaces/select-generico.interface';
import { IVentas } from '../commons/interfaces/ventas.interface';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  annoList: ISelectGenerico[];
  annoSelected: string;
  totalVentasPorAnno: number;
  ventasList: IVentas[] = [];
  monthList: ISelectGenerico[];
  reporteMonthly: IReporteMonthly[];
  monthMax: string;

  constructor(
    private ventasHttp: VentasHttp,
  ) {
    this.annoList = this.fillAnnoList();
    this.annoSelected = null;
    this.totalVentasPorAnno = null;
    this.monthList = this.fillMonthList();
    this.reporteMonthly = [];
    this.monthMax = null;
  }

  ngOnInit(): void {
    this.getAllVentas();
  }

  private fillAnnoList(): ISelectGenerico[] {
    return [
      { value: 2020, text: '2020' },
      { value: 2021, text: '2021' },
      { value: 2022, text: '2022' },
    ];
  }

  private fillMonthList(): ISelectGenerico[] {
    return [
      { value: 1, text: 'Enero' },
      { value: 2, text: 'Febrero' },
      { value: 3, text: 'Marzo' },
      { value: 4, text: 'Abril' },
      { value: 5, text: 'Mayo' },
      { value: 6, text: 'Junio' },
      { value: 7, text: 'Julio' },
      { value: 8, text: 'Agosto' },
      { value: 9, text: 'Septiembre' },
      { value: 10, text: 'Octubre' },
      { value: 11, text: 'Noviembre' },
      { value: 12, text: 'Diciembre' },

    ];
  }

  private getAllVentas(): void {
    console.log('getAllProducto')
    this.ventasHttp
      .getAll()
      .subscribe(res => {
        console.log('res', res)
        this.ventasList = res;
      });
  }

  onChangeAnno(): void {
    this.totalVentasPorAnno = 0;
    this.reporteMonthly = [];
    this.monthMax = null;

    const annoNum = Number(this.annoSelected);
    const ventasFilteredByAnno = this.ventasList.filter(x => new Date(x.DFecha).getFullYear() === annoNum);
    ventasFilteredByAnno.forEach(item => {
      this.totalVentasPorAnno += item.MMonto;
      item.monthNum = new Date(item.DFecha).getMonth() + 1;
      item.monthText = this.monthList.find(x => x.value === item.monthNum).text;
    });


    const grupo2 = groupByToMap(ventasFilteredByAnno, v => v.monthText);

    console.log('grupo2', grupo2)

    grupo2.forEach((value, key, map) => {
      let suma = 0;
      value.forEach(x => suma += x.MMonto);
      const reporte: IReporteMonthly = {
        anno: annoNum,
        month: 0,
        monthText: key,
        total: suma
      };
      this.reporteMonthly.push(reporte);
    });

    console.log('this.reporteMonthly', this.reporteMonthly);

    let totalMax = 0;
    
    this.reporteMonthly.forEach(item => {
      if (item.total > totalMax) {
        totalMax = item.total;
        this.monthMax = item.monthText;
      }
    });

    console.log('monthMax', this.monthMax);
  }

  

}
