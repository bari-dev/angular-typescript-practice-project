import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.css']
})

export class AppPostComponent implements OnInit, OnDestroy{
  posts: Post[] = [];

  private postsSub!: Subscription;

  constructor(public postsService: PostsService){}
  
  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
