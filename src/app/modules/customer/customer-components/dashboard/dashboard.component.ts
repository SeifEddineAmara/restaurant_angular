import { Component } from '@angular/core';
import { CustomerService } from '../../customer-service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  categories: any = [];
  isSpinning: boolean;
  validateForm!: FormGroup;
  size: NzButtonSize = 'large'



  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder

  ) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  searchCategory(){
    this.isSpinning = true;
    this.categories = [];
    this.customerService.getAllCategoriesByName(this.validateForm.get(['title'])!.value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
        this.isSpinning = false;
      });
    });

  }


 
  getAllCategories() {
    this.categories = [];
    this.customerService.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    });
  }




}
