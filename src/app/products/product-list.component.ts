import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl:'./product-list.component.html',
  styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List1';
  imageWidth: number=50;
  imageHight:number=2;
  showImage:boolean=false;
  _listFilter:string;
  errorMessage:string;
  
  
  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter=value;
    this.filteredProducts=this.listFilter?this.performFilter(this._listFilter) : this.products;
  }
  filteredProducts:IProduct[];
  products:IProduct[];

toggleImage():void{
    this.showImage= !this.showImage;
}

//used to dependency injection in typeScript
private _productService;


constructor(private productService:ProductService){
  
}
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products=>{
        this.products=products
        this.filteredProducts=this.products;
      },
      error:err=> this.errorMessage=err
    });
    
  
  }

performFilter(filterBy:string):IProduct[]{
filterBy=filterBy.toLocaleLowerCase();
return this.products.filter((product : IProduct) =>
                  product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

onRatingClicked(message:string):void{
  this.pageTitle='Product list'+ message;
}
}