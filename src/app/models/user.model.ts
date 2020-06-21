export class User {
  name: string;
  email: string;


  constructor(data?) {
    this.name = data && data.name ? data.name : '';
    this.email = data && data.email ? data.email : '';
  }
}
