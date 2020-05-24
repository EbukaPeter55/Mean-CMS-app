import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enteredContent = '';
  enteredTitle = '';
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  public post: Post;
  isLoading = false;
  private authStatusSub: Subscription

  // The activated route helps to hold the information on the particular route we are currently on  
  constructor(public postsservice: PostsService, public route: ActivatedRoute,
      private authservice: AuthService) { }

  ngOnInit() {
    this.authStatusSub =  this.authservice.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
    'title': new FormControl(null, 
      {validators: [Validators.required, Validators.minLength(3)]
      }),
    'content': new FormControl(null, 
      {validators: [Validators.required]}),
     'image': new FormControl(null, {validators: [Validators.required], 
    asyncValidators: [mimeType]
    }) 
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
    if(paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.isLoading = true;
      this.postsservice.getPost(this.postId).subscribe(postData => {
      this.isLoading = false;
        this.post = {
          id: postData._id, 
          title: postData.title,
          content: postData.content,
          imagePath: postData.imagePath,
          creator: postData.creator  
        };
        this.form.setValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.imagePath
        });
      });
    }else{
      this.mode = 'create';
      this.postId = null;
    }
    });
  }
  
  // This method is triggered once the image file in the template is changed
  onImagePicked(event: Event){
 const file = (event.target as HTMLInputElement).files[0];
 this.form.patchValue({image: file});
 this.form.get('image').updateValueAndValidity();
 const reader = new FileReader();
 reader.onload = () => {
  this.imagePreview = reader.result as string;
 };
//  Load the file that has been uploaded
 reader.readAsDataURL(file);
  }
   onSavePost() {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsservice.addPost(
        this.form.value.title, this.form.value.content, this.form.value.image);
    }else{
      this.postsservice.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
  
    this.form.reset();
  // form.resetForm();  
}
  
ngOnDestroy(){
  this.authStatusSub.unsubscribe();
}

}
