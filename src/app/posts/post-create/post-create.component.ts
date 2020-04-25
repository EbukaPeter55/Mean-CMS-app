import { Component, OnInit} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from "../post.model";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  form: FormGroup;
  private mode = "create";
  private postId: string;
  public post: Post;
  isLoading = false;

  // The activated route helps to hold the information on the particular route we are currently on  
  constructor(public postsservice: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
    'title': new FormControl(null, 
      {validators: [Validators.required, Validators.minLength(3)]
      }),
    'content': new FormControl(null, 
      {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
    if(paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.isLoading = true;
      this.postsservice.getPost(this.postId).subscribe(postData => {
      this.isLoading = false;
        this.post = {id: postData._id, title: postData.title, content: postData.content};
        this.form.setValue({
          'title': this.post.title,
          'content': this.post.content
        });
      });
    }else{
      this.mode = 'create';
      this.postId = null;
    }
    });
  }

   onSavePost() {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsservice.addPost(this.form.value.title, this.form.value.content);
    }else{
      this.postsservice.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
  
    this.form.reset();
  // form.resetForm();  
}
  
updatePost(id: string, title: string, content: string){
const post: Post = {id: id, title: title, content: content};

}
 

}
