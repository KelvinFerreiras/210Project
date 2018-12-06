export class Post {
    public user: {
        username:string
        firstName:string
        lastName:string
    }
    public content: {
        text:string
    }
    public details:{
        date: string
    }
  
    constructor(username:string, firstName:string, lastName:string, text:string, date: string) {
        this.user.username = username;
        this.user.lastName = lastName;
        this.user.firstName = firstName;

        this.content.text= text;

        this.content.text=text;
    }
  }