import { IsString, IsInt, IsNotEmpty, MinLength, MaxLength, Matches, IsNumber } from "class-validator";


export class UserDto {
    
    
    // @IsString()  
    // @IsNotEmpty()
    // id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    email_id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: "password too week" })
    password: string;

    @IsInt()
    age: number;

    @IsString()
    city: string;
    


}

 export class GetCredentialsDto {
     
    @IsNotEmpty()
    email_id : string;

    @IsNotEmpty()
    password : string;


 }

 export class userAddressDetails {


    @IsNotEmpty()
    @IsString()
    address: string;
  
    
    @IsNotEmpty()
    @IsString()
    city: string;
  
    
    @IsNotEmpty()
    @IsString()
    state: string;
 
      
    @IsNotEmpty()
    @IsNumber()
    pincode: number;
  
  }
  
  
  