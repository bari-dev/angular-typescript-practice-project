import { Component, EventEmitter, Output }  from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  title = '';
  content = '';
  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService){}

  onSubmit(form: NgForm){
    if (form.invalid) return;

    this.postsService.addPost(form.value.title, form.value.content);
  }
}