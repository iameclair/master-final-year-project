import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InfoService } from '../../services/info.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private infoService: InfoService,
              private router: Router,
              private flashMessagesService: FlashMessagesService
              ) {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info'});
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
