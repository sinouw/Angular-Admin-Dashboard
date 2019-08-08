import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'clublist',
  templateUrl: './clublist.component.html',
  styleUrls: ['./clublist.component.scss']
})
export class ClublistComponent implements OnInit, OnDestroy {

  rows: any[];
  rowsclub: any[];

  loadingIndicator: boolean;
  reorderable: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient
  ) {
    // Set the defaults
    this.loadingIndicator = true;
    this.reorderable = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._httpClient.get('api/contacts-contacts')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((contacts: any) => {
        this.rows = contacts;
        console.log(this.rows);
        this.loadingIndicator = false;
      });
      this._httpClient.get('https://localhost:44367/api/clubs')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((clubs: any) => {
        // setTimeout(() => {
          this.rowsclub = clubs;
          console.log(this.rowsclub);
          this.loadingIndicator = false;
        // },1000);
        
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
