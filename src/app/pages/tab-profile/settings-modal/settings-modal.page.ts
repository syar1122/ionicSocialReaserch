import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.page.html',
  styleUrls: ['./settings-modal.page.scss'],
})
export class SettingsModalPage implements OnInit {
  theme:boolean;
  constructor(private themeService:ThemeService) { }

  ngOnInit() {
    this.theme = this.themeService.getTheme()
  }
  changeTheme(){
    this.themeService.toggleTheme();
  }

}
