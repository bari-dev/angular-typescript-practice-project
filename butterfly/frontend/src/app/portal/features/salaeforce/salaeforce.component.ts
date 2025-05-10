import { Component } from '@angular/core';
import jsforce from 'jsforce';


@Component({
  selector: 'app-salaeforce',
  templateUrl: './salaeforce.component.html',
  styleUrls: ['./salaeforce.component.css']
})
export class SalaeforceComponent {
  

  login(){
    // const conn = new jsforce.Connection({
    //   instanceUrl: 'https://login.salesforce.com/',
    //   accessToken: 'your_access_token',
    // });
  }
    
  // conn.query('SELECT Id, Name FROM Account', (err, result) => {
  //   if (err) return console.error(err);
  //   console.log('Accounts:', result.records);
  // });

  // salesforceLogin() {
  //   jsforce.browser.login(this.onLogedIn);
  //   return from(
  //     new Promise<any>((resolve) => jsforce.browser.on('connect', resolve))
  //   ).pipe(
  //     concatMap(({ conn }) => {
  //       if (!conn) return EMPTY;
  //       return of(conn.accessToken);
  //     })
  //   );
  // }

  // // onLogedIn(event, status) {
  // //   console.log(document.cookie);
  // //   console.log('logedin event', event, status);
  // // }

  // logout() {
  //   // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  //   jsforce.api('/me/permissions', 'delete', null, () => jsforce.logout());
  //   this.stopAuthenticateTimer();
  //   this.accountSubject.next(null);
  //   this.router.navigate(['/login']);
  // }
}
