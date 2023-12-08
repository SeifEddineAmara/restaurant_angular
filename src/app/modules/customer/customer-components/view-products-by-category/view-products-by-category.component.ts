import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-view-products-by-category',
  templateUrl: './view-products-by-category.component.html',
  styleUrls: ['./view-products-by-category.component.scss']
})
export class ViewProductsByCategoryComponent {
  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  Products: any = [];
  isSpinning: boolean;
  validateForm!: FormGroup;
  size: NzButtonSize = 'large'
  constructor(
    private service: CustomerService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });

    this.getProductsByCategory();
  }
  submitForm() {
    this.isSpinning = true;
    this.Products = [];
    this.service.getAllProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
        this.isSpinning = false;
      });
    });
  }


  getProductsByCategory() {
    this.Products = [];
    this.service.getProductsByCategory(this.categoryId).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      });
    });

  }




}
