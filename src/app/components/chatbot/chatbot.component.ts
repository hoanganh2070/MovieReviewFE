import { AfterViewInit, Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html'
})
export class ChatbotComponent  {

  public show: boolean = false;
  public chase: number = 0;
  public running: boolean = true;
  public currentMessage : HTMLElement;
  public chatbox : HTMLUListElement;
 

  constructor(private socket : Socket) {

    this.socket.on('chatbot', (message :any) => {
      if(message === '\0') this.running = true;
      this.handleMessage(message);
    });
    
  }
  

  handleMessage(message: any) {
    //@ts-ignore
    this.currentMessage.innerHTML = this.currentMessage?.innerHTML + message;
    this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
  }


  showChatBot(){
    if(this.show == false){
      this.show = true;
    }
    else this.show = false;
  }

  send(){
    if(this.running == false) return;
    this.chase++;
    this.chatbox = document.getElementById('chatbox')! as HTMLUListElement;
    const mess = (document.getElementById("input") as HTMLInputElement);
    let message = mess.value;
    if(message == "") return;
    //@ts-ignore
    this.chatbox.insertAdjacentHTML('beforeend','<li class="chat outcoming"><p>'+mess.value+'</p></li>');
    this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
    mess.value = "";
    this.socket.emit('chatbot', message);
    this.running = false;
    //@ts-ignore
    this.chatbox.insertAdjacentHTML('beforeend',`<li class="chat incoming">
    <span class="material-symbols-outlined">smart_toy</span>
    <p id='` + this.chase+`'></p>
    </li>`);
    this.currentMessage = document.getElementById(this.chase.toString()) as HTMLElement;
   
  }

}
