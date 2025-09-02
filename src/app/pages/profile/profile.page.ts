import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone:false,
})
export class ProfilePage implements OnInit {
  onSave() {
    console.log('Profile saved (demo)');
    alert('Profile saved (demo)');
  }
  constructor(    private auth: AuthService
) { }

  ngOnInit() {
  }

  logout() {
  this.auth.logout();
}

}
