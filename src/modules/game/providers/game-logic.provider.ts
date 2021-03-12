import { Injectable } from '@nestjs/common';

const MAXIMUM_TABLE_PLAYERS = 4;

enum TableStatus {
  COLLECTING_PLAYERS,
  GAME_STARTED,
}

export interface Table {
  status: TableStatus;
  players: string[];
}

@Injectable()
export class GameLogicProvider {
  private tables: { [key: string]: Table };

  createNewTableIfNotExist(tableName) {
    if (!this.tables.hasOwnProperty(tableName)) {
      this.tables[tableName] = {
        status: TableStatus.COLLECTING_PLAYERS,
        players: [],
      };
    }
  }

  isTherePlaceOnTheTable(tableName) {
    return this.tables[tableName].players.length < MAXIMUM_TABLE_PLAYERS;
  }

  addPlayerToTable(tableName, playerId) {
    this.tables[tableName].players.push(playerId);
  }

  removePlayerFromAllTables(playerId) {
    for (const tableName in this.tables) {
      this.tables[tableName].players = this.tables[tableName].players.filter(
        (el) => el !== playerId,
      );
    }
  }

  getTablePlayersAmount(tableName) {
    return this.tables[tableName].players.length;
  }

  isTableFull(tableName) {
    return this.tables[tableName].players.length === MAXIMUM_TABLE_PLAYERS;
  }

  startGame(tableName) {
    this.tables[tableName].status = TableStatus.GAME_STARTED;
  }
}
