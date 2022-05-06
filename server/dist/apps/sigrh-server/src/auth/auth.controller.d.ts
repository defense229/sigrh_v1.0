import { AuthService } from './auth.service';
import { UserDto } from './user_.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: UserDto): Promise<{
        statusCode: number;
        data: {
            statusCode: number;
            message: string;
            user: any;
        };
    }>;
}
