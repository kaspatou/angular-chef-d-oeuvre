import {DataSource} from '@angular/cdk/collections';
import {Materiel} from '../../model/materiel.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {MatPaginator, MatSort} from '@angular/material';
import {MaterielService} from '../../service/materiel.service';

export class ListeMaterielDatasource extends DataSource<Materiel> {
  private dataStream: BehaviorSubject<Materiel[]> = new BehaviorSubject<Materiel[]>([]);

  set data(materiel: Materiel[]) {
    this.dataStream.next(materiel);
  }

  get data(): Materiel[] {
    return this.dataStream.value;
  }

  constructor(private paginator: MatPaginator, private sort: MatSort, private materielService: MaterielService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Materiel[]> {
    this.dataStream = this.materielService.availableMateriels$;
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.dataStream,
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.dataStream.getValue().length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Materiel[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Materiel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'marque':
          return compare(a.marque, b.marque, isAsc);
        case 'modele':
          return compare(a.modele, b.modele, isAsc);
        case 'OS':
          return compare(a.os, b.os, isAsc);
        case 'version OS':
          return compare(a.verOs, b.verOs, isAsc);
        case 'N° Serie':
          return compare(a.serie, b.serie, isAsc);
        case 'Imei':
          return compare(a.imei, b.imei, isAsc);
        default:
          return 0;
      }

    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
