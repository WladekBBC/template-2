import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PERMS_KEY } from "src/decorators/permissions.decorator";
import { Perms } from "src/enums/permissions.enum";

@Injectable()
export class PermsGuard implements CanActivate {
  constructor(private reflector: Reflector,private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPerms = this.reflector.getAllAndOverride<Perms[]>(PERMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPerms) {
      return true;
    }
    
    const request:Request = context.switchToHttp().getRequest();
    const perms = this.jwtService.decode(`${request.headers.authorization}`)

    return requiredPerms.some((perm) => perms?.permissions.includes(perm));
  }
}