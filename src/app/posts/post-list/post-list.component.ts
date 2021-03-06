import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'yellow', opacity: 0}),
        animate(2000, style({ backgroundColor: 'white', opacity: 1}))
      ])
    ])
  ]
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = [];
private postsSub: Subscription;
isLoading = false;
totalPosts = 0;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
userIsAuthenticated = false;
userId: string;
private authStatusSub: Subscription;

  constructor(public postsservice: PostsService,  private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsservice.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsservice.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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
  }, () => {
    this.isLoading = false;
  });
}
  // Life cycle that is called whenever a component is about to be removed
  ngOnDestroy(){
  this.postsSub.unsubscribe();
  }
}
