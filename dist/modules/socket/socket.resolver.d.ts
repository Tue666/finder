import { SocketService } from './socket.service';
import { CreateSocketInput } from './dto/create-socket.input';
import { UpdateSocketInput } from './dto/update-socket.input';
export declare class SocketResolver {
    private readonly socketService;
    constructor(socketService: SocketService);
    createSocket(createSocketInput: CreateSocketInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateSocket(updateSocketInput: UpdateSocketInput): string;
    removeSocket(id: number): string;
}
