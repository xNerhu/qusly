import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { Client } from 'qusly-core';

import { Session } from './session';
import { QueueItem } from './queue-item';
import { getPath } from '../utils';

export class TransferManager {
  public client: Client;

  public queue: QueueItem[] = [];

  public transfering = false;

  constructor(public session: Session, public type: 'download' | 'upload') { }

  public async connect() {
    if (!this.client) {
      this.client = new Client();

      const config = this.session.site;
      const { error } = await this.client.connect(config);

      if (error) throw error;
    }
  }

  public async add(remotePath: string, fileName: string) {
    await this.connect();
    const localPath = getPath('downloads');

    if (!existsSync(localPath)) {
      mkdirSync(localPath);
    }

    this.queue.push({
      remotePath,
      localPath: join(localPath, fileName),
    });

    this.process();
  }

  private async process() {
    if (this.transfering || !this.queue.length) return;

    this.transfering = true;

    const { remotePath, localPath } = this.queue[0];
    const { error } = await this.client.download(remotePath, createWriteStream(localPath));

    if (error) {
      console.error('Error while transfering a file', remotePath, localPath, error);
    }

    this.queue.shift();
    this.transfering = false;
    await this.process();
  }
}
