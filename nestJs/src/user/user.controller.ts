import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {  GetCredentialsDto, userAddressDetails, UserDto } from "./data/user.dto";
import { User } from "./entities/user.entity";
import { GetUser } from "./get-user.decorator";
import { UserService } from "./user.service";


@Controller("users")
export class UserController {

    constructor(private userService : UserService){

    }

    @Post('/signup')
    create(@Body(ValidationPipe) createUserDto: UserDto) : Promise<any> {
        return this.userService.signUp(createUserDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) getCredentialsDto: GetCredentialsDto): Promise<{ accessToken: string }>{
        return this.userService.signIn(getCredentialsDto);

    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user) {
        console.log(user);
    }


    @Post('/address')
    userAddress(
        @Body() add_addressDto: userAddressDetails,
        @GetUser()user
    ): Promise<any> {
        return this.userService.userAddress(user, add_addressDto);
    }

    @Get('/myDetail')
    getMyDetail(
        @GetUser() user
    ){
        return this.userService.getDetails(user);
    }


//     @Get()
//     getAllUser() : User[] {
//         return this.userService.getAllUser();

//     }

//     @Get("/:id")
//     getUserById(@Param("id") id: string ) : User {
//         return this.userService.getUserById(id);
//     }


//     @Patch()
//     updateUser(@Body() user: User): string{
//         return this.userService.updateUserService(user);
//     }


//     @Delete("/:id")
//     deleteUser(@Param("id") id: string) :string{
//         return this.userService.deleteUserService(id);
//     }

//     @Post()
//     addUser(@Body( new ValidationPipe()) createUserDto: UserDto): User{
//         return this.userService.addUserService(createUserDto);
//     }
    





}