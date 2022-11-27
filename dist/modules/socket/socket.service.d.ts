import { MessageService } from 'modules/message/message.service';
import { CreateSocketInput } from './dto/create-socket.input';
import { UpdateSocketInput } from './dto/update-socket.input';
export declare class SocketService {
    private messageService;
    constructor(messageService: MessageService);
    create(createSocketInput: CreateSocketInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSocketInput: UpdateSocketInput): string;
    remove(id: number): string;
}
