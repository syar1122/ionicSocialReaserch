import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  list: any = [];
  categoryDone: Promise<boolean>;
  filteredData: any = [];
  selectedArray: any = [];
  @ViewChild('searchbar', { static: false }) searchbar;
  isSearchBarOpened = false;
  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.categoryDone = this.firebaseService.categoryDone.asObservable().toPromise()
    this.firebaseService.getCategories().subscribe(cats => {
      this.list = cats
      this.filteredData = this.list
    });
  }

  ngOnInit() {

  }
  searchbarToggle() {
    if (!this.isSearchBarOpened) {
      this.isSearchBarOpened = !this.isSearchBarOpened
      console.log("Opened")
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150)
    } else {
      this.isSearchBarOpened = !this.isSearchBarOpened
      console.log("Closed")
    }
  }
  onChange(item, isChecked: boolean) {
    if (!isChecked) {
      this.selectedArray.push({ id: item.id, name: item.name });
    } else {
      let index = this.selectedArray.indexOf(name);
      this.selectedArray.splice(index, 1);
    }
  }
  editCategories() {
    console.log(this.selectedArray)
  }
  setCategories() {
    console.log("new")
    this.firebaseService.setMyCategories(this.selectedArray);
    this.firebaseService.categoryDone.next(true)
  }
  filterData(ev: any) {
    const val = ev.target.value
    if (val && val.trim() != '') {
      this.filteredData = this.filteredData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    } else {
      this.filteredData = this.list
    }
  }

}
