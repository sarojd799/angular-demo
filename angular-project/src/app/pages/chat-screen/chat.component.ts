import { Component, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  prevChatList = [
    'Dev', 'test', 'Chinmay Panda', 'Ashish Sahu', 'Jaggu Panda', 'Sourav Guru', 'Pratyush padhi', 'Suraj Gagrai'
  ].map(u => ({
    username: u + '@gmail.com',
    chat: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, aspernatur soluta dicta reiciendis, quae recusandae eaque in aut ab libero nam! Ratione error nemo doloremque dolores harum deleniti sint neque.'
  }))

  selectedUser: any = this.prevChatList[0];

  constructor() { }

  ngOnInit(): void {
  }


  selectUserToChat(event: any) {
    this.selectedUser = event;
  }

}
