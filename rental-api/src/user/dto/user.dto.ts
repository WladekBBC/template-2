import { Perms } from "src/enums/permissions.enum";

export class CreateUserDto{
    readonly email: string;
    readonly password: string;
    readonly permissions?: Perms;
}

export class UpdateUserDto{
    email?: string;
    password?: string;
    permissions?: Perms;
}

export class UserDto{
    readonly email: string;
    readonly permissions: Perms;
}