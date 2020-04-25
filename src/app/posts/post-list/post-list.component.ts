import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = [];
private postsSub: Subscription;
isLoading = false;

  constructor(public postsservice: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsservice.getPosts();
    this.postsSub = this.postsservice.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.isLoading = false;
      this.posts = posts;
    });
  }
onDelete(postId: string){
  this.postsservice.deletePost(postId);
}
  // Life cycle that is called whenever a component is about to be removed
  ngOnDestroy(){
  this.postsSub.unsubscribe();
  }
}
