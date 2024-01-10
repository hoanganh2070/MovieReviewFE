import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html'
})
export class ChatbotComponent {

  public show: boolean = false;

  showChatBot(){
    if(this.show == false){
      this.show = true;
    }
    else this.show = false;
  }

}
