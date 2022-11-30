class UserEntity {

    id: string;
    name: string;
    email: string;
    password: string;
    
    constructor(id:string, name:string, email:string, password:string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
     static createFromInput = (id:string,body : any) => {
     return new UserEntity(
          id, 
          body.name, 
          body.email, 
          body.password
     );   
    };
     static createFromObject = (obj:any) => {
      return new UserEntity(
          obj.id, 
          obj.name , 
          obj.email,
          obj.password,
          );
    };
  }
  export default UserEntity;