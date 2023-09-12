import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NoteService } from 'src/Note/note.service';

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class NoteGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    constructor(private noteService: NoteService) {}
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('updateText')
    async updateText(@MessageBody() data: { id: string, text: string }) {
        this.server.to(data.id).emit('updateText', { id: data.id, text: data.text });
        await this.noteService.updateNoteText(data.id, data.text)
    }
    
    @SubscribeMessage('join')
    join(client: Socket, roomId: string) {
        client.join(roomId);
        console.log(`Client joined room: ${roomId}`)
    }

    @SubscribeMessage('leave')
    leave(client: Socket, roomId: string) {
        client.leave(roomId);
        console.log(`Client left room: ${roomId}`)
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('User connected');
    }

    handleDisconnect(client: Socket) {
        console.log('User disconnected');
    }

    afterInit(server: any) {
        console.log('Socket is live')
    }
}
