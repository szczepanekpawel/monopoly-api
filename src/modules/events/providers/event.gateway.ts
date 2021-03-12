import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GameLogicProvider } from '../../game/providers/game-logic.provider';
import { IncomingMessagesTypes } from '../types/incoming-messages.types';
import { OutcomingMessagesTypes } from '../types/outcoming-messages.types';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  constructor(private gameLogicProvider: GameLogicProvider) {}

  @SubscribeMessage(IncomingMessagesTypes.JOIN_TABLE)
  handleJoinTable(
    @MessageBody() table: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.gameLogicProvider.createNewTableIfNotExist(table);

    if (!this.gameLogicProvider.isTherePlaceOnTheTable(table)) {
      client.to(table).emit(OutcomingMessagesTypes.TABLE_IS_FULL);
    } else {
      this.gameLogicProvider.addPlayerToTable(table, client.id);

      client
        .join(table)
        .emit(OutcomingMessagesTypes.YOU_JOINED_TO_TABLE, table);

      client.broadcast
        .to(table)
        .emit(
          OutcomingMessagesTypes.OTHER_PLAYER_JOINED_TO_TABLE,
          this.gameLogicProvider.getTablePlayersAmount(table),
        );

      if (this.gameLogicProvider.isTableFull(table)) {
        this.gameLogicProvider.startGame(table);
        client.to(table).emit(OutcomingMessagesTypes.GAME_STARTED);
      }
    }
  }

  @SubscribeMessage('startGame')
  handleStartGame(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(room).emit('joinedRoom', room);
    client.broadcast.to(room).emit('playerJoined');
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.gameLogicProvider.removePlayerFromAllTables(client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
