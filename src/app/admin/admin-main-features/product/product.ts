import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globle } from '../../../core/services/globle';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {


  product_ID: any = false;
  @ViewChild('fileInput') fileInput!: any;
  productForm!: FormGroup;
  selectedImages: File[] = [];

  submitted: boolean = false;
  isBTNLoding: boolean = false;
  isEditMode: boolean = false;
  imagesInvalid: boolean = false;
  tempUploadedImages: string[] = [];
  productLogs: any = {};
  isPageLoading: boolean = true;


  imagePreviews: {
    url: string;
    file?: File;
    isOld?: boolean;
  }[] = [];
  productList: any[] = [];
  categories: any[] = [];
  oldImages: string[] = [];

  pagingConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    public api_s: Api,
    public globle_s: Globle,
    private fb: FormBuilder,
    private cf: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category_id: ['', Validators.required],
      sub_title: [''],
      thumbnail: [''],
      slug_url: [''],
      keywords: [''],
      product_QR: [''],
      description: ['', Validators.required],
      images: [[],]
    });

    this.getProduct({ page: 1 });
    this.getCaregory();
    this.cf.detectChanges();
  }


  opnModal(modalName: string) {
    this.globle_s.modalOpen(modalName);
  }
  thumbnailFile: File | null = null;
  imagesFiles: File[] = [];

  thumbnailPreview: any = null;

  dismissModal(modalName: string) {
    this.globle_s.modalDismiss(modalName);
    this.product_ID = null;
  }
  onThumbnailChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.thumbnailFile = file;

    const reader = new FileReader();
    reader.onload = () => this.thumbnailPreview = reader.result;
    reader.readAsDataURL(file);
  }

  onImagesChange(event: any) {
    this.imagesFiles = [];
    this.imagePreviews = [];

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imagesFiles.push(files[i]);

      const reader: any = new FileReader();
      reader.onload = () => this.imagePreviews.push(reader.result);
      reader.readAsDataURL(files[i]);
    }
  }

  productFormModelOpen(key: string, data: any) {

    this.selectedImages = [];
    this.imagePreviews = [];
    this.imagesInvalid = false;
    this.submitted = false;

    if (key === 'Add') {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;

      this.productForm.patchValue({
        id: data.id,
        name: data.name,
        category_id: data.category_id,
        sub_title: data.sub_title,
        thumbnail: data.thumbnail,
        slug_url: data.slug_url,
        keywords: data.keywords,
        product_QR: data.product_QR,
        description: data.description,

      });

      if (data.images?.length) {
        this.oldImages = [...data.images];
        this.tempUploadedImages = [...data.images];

        data.images.forEach((img: string) => {
          this.imagePreviews.push({
            url: this.api_s.imageBaseUrl + 'products_image/' + img,
            isOld: true
          });
        });
      }
    }

    // EXACT PLACE — VALIDATOR LOGIC
    if (this.isEditMode) {
      this.productForm.get('images')?.clearValidators();
    } else {
      this.productForm.get('images')?.setValidators(Validators.required);
    }
    this.productForm.get('images')?.updateValueAndValidity();

    // FINALLY OPEN MODAL
    this.globle_s.modalOpen('productFormModelOpen');
  }

  closemodel_production() {
    this.globle_s.modalDismiss('productFormModelOpen');
    this.productForm.reset();
    this.fileInput.nativeElement.value = '';

    this.imagePreviews = [];
    this.submitted = false;
    this.isEditMode = false;
  }

  onImagesSelect(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const formData = new FormData();
      formData.append('images', file); //  single file

      //  upload-image API CALL
      this.api_s.postApi('uploade-image', formData).then(
        (resp: any) => {

          if (!resp || !resp.status) {
            this.globle_s.showToastr('Error', 'Image upload failed');
            return;
          }

          // EXACT KEY FROM BACKEND
          const imageName = resp.image_name;

          if (!imageName) {
            this.globle_s.showToastr('Error', 'Image name not found');
            return;
          }

          // save uploaded image name
          this.tempUploadedImages.push(imageName);

          // preview
          this.imagePreviews.push({
            url: this.api_s.imageBaseUrl + 'temp_image/' + imageName,
            isOld: false
          });
          this.cf.detectChanges();
        },
        () => {
          this.globle_s.showToastr('Error', 'Image upload error');
        }
      );
    });

    // reset input
    this.fileInput.nativeElement.value = '';
  }

  // removeImage(index: number) {
  //   const removed = this.imagePreviews[index];

  //   this.imagePreviews.splice(index, 1);


  //   if (!removed.isOld && removed.file) {
  //     this.selectedImages = this.selectedImages.filter(
  //       file => file !== removed.file
  //     );
  //   }

  //   this.productForm.patchValue({ images: this.selectedImages });
  //   this.productForm.get('images')?.updateValueAndValidity();
  // }

  removeImage(index: number) {

    // preview remove
    this.imagePreviews.splice(index, 1);

    // actual image remove
    this.tempUploadedImages.splice(index, 1);
  }

  getProduct(body: any) {
    const page = body.page || 1;

    this.isPageLoading = true;
    this.api_s.postApi(`product-get?page=${page}`, '').then((resp: any) => {
      if (resp && resp.status) {

        const products = resp.data.map((product: any) => ({
          ...product,
          images: JSON.parse(product.images)
        }));

        this.productLogs[page] = products;
        this.productList = products;

        console.log("::::data", this.productList)
        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();
      } else {
        this.globle_s.showToastr('Error', resp.message);
      }

      this.isPageLoading = false; // ✅ SAFE
      this.cf.detectChanges();
    }, () => {

      this.isPageLoading = false; // ✅ SAFE

      this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
    });
  }
  pageChanged(page: number) {
    this.pagingConfig.currentPage = page;

    if (this.productLogs[page]) {
      this.productList = this.productLogs[page];
      this.cf.detectChanges();
    } else {
      this.getProduct({ page });
    }
  }

  getCaregory() {
    this.api_s.postApi('categories-all', '').then((resp: any) => {
      if (resp && resp.status) {

        this.categories = resp.data || resp;
        this.cf.detectChanges()
      } else {
        this.globle_s.showToastr('Error', resp.message);
      }
    }, (err: any) => {
      this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
    });
  }

  // ===== SUBMIT =====
  productFormSubmit() {
    this.submitted = true;

    //  image validation
    if (!this.tempUploadedImages.length) {
      this.imagesInvalid = true;
      this.globle_s.showToastr('Error', 'Please select at least one product image');
      return;
    }
    //  form validation
    // if (this.productForm.invalid) { 

    //   this.adminService.showToastr('Error', 'Please fill all required fields');
    //   return;
    // }

    this.isBTNLoding = true;
    this.isPageLoading = true;
    //  FORM DATA
    const formData = new FormData();

    formData.append('name', this.productForm.value.name);
    formData.append('category_id', this.productForm.value.category_id);
    formData.append('sub_title', this.productForm.value.sub_title);
    formData.append('slug_url', this.productForm.value.slug_url);
    formData.append('description', this.productForm.value.description);

    formData.append('keywords', this.productForm.value.keywords);
    formData.append('product_QR', this.productForm.value.product_QR);
    formData.append('thumbnail', this.productForm.value.thumbnail);

    //  IMPORTANT PART → MULTIPLE IMAGES
    // if (this.selectedImages.length) {
    //   this.selectedImages.forEach(file => {
    //     formData.append('images', JSON.stringify(this.tempUploadedImages));
    //   });
    // }
    // if (this.tempUploadedImages.length) {
    //   formData.append('images', JSON.stringify(this.tempUploadedImages));
    // }
    this.tempUploadedImages.forEach(img => {
      formData.append('images[]', img);
    });

    //  EDIT MODE
    if (this.isEditMode) {
      formData.append('id', this.productForm.value.id);
    }

    const apiUrl = this.isEditMode ? 'product-edit' : 'product-add';

    // API CALL
    this.api_s.postApi(apiUrl, formData).then(
      (resp: any) => {
        this.isBTNLoding = false;

        if (resp && resp.status) {

          if (resp.data?.images) {
            resp.data.images = JSON.parse(resp.data.images);
            this.tempUploadedImages = []
          }

          if (this.isEditMode) {
            // update product
            this.productList = this.productList.map(p =>
              p.id === this.productForm.value.id ? resp.data : p
            );
          } else {
            // return
            this.productLogs = {};

            this.pagingConfig.currentPage = 1;
            this.getProduct({ page: this.pagingConfig.currentPage });
            this.productList.unshift(resp.data);

          }
          this.isPageLoading = false;
          this.globle_s.showToastr('Success', resp.message);
          this.closemodel_production();

        } else {
          this.globle_s.showToastr('Error', resp.message || 'Product failed');
        }
      },
      () => {
        this.isBTNLoding = false;
        this.globle_s.showToastr('Error', 'Server error');
      }
    );
  }

  onCheckboxChange(event: any, field: string) {
    this.productForm.patchValue({
      [field]: event.target.checked ? 1 : 0
    });
  }

  deleteProduct(id: number) {
    this.globle_s.confirmAlert(
      'Are you sure you want to delete this product?',
      'warning'
    ).then((result: any) => {

      if (!result) {
        return;
      }

      // ✅ show loader ONLY after confirmation
      this.isPageLoading = true;

      this.api_s.postApi('product-delete', { id: id }).then(
        (resp: any) => {

          if (resp && resp.status) {
            this.globle_s.showToastr('Success', resp?.message);
            this.productList = this.productList.filter(
              (obj: any) => obj.id !== id
            );
            this.cf.detectChanges();
          } else {
            this.globle_s.showToastr('Error', resp?.message);
          }

          // ✅ hide loader safely
          setTimeout(() => {
            this.isPageLoading = false;
            this.cf.detectChanges();
          });

        },
        () => {
          setTimeout(() => {
            this.isPageLoading = false;
          });
        }
      );
    });
  }


}
