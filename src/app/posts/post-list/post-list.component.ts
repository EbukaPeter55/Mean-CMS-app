import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = [];
private postsSub: Subscription;
isLoading = false;
totalPosts = 0;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
  constructor(public postsservice: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsservice.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsservice.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }
  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsservice.getPosts(this.postsPerPage, this.currentPage);
  }
onDelete(postId: string){
  this.isLoading = true;
  this.postsservice.deletePost(postId).subscribe(() => {
    this.postsservice.getPosts(this.postsPerPage, this.currentPage);
  });
}
  // Life cycle that is called whenever a component is about to be removed
  ngOnDestroy(){
  this.postsSub.unsubscribe();
  }
}
