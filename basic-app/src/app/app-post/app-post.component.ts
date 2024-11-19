import { Component } from '@angular/core';

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.css']
})

export class AppPostComponent {
  // posts = [
  //   { title: 'asd1', content: 'asdasdasdasd' },
  //   { title: 'asd2', content: 'asdasdasdasd' },
  //   { title: 'asd3', content: 'asdasdasdasd' },
  // ];
  posts: Post[] = [];
}
