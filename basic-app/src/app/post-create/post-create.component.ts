import { Component }  from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.compnent.css']
})

export class PostCreateComponent {
  enterValued = '';
  showValued  = '';
  postSubmit  = '';

  onSubmitButton(postInput: HTMLTextAreaElement){    
    this.postSubmit = postInput.value;
  }

  onSubmitButton2(){
    this.showValued = this.enterValued
  }
}