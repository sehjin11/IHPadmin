import { WatchHistoryDto } from './dto/watch_history.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchDto } from './dto/watch.dto';
import { Watch } from './entity/watch.entity';
import { WatchHistoryRepository, WatchRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(WatchRepository) private watchRepository: WatchRepository,
    @InjectRepository(WatchHistoryRepository)
    private watchHistoryRepository: WatchHistoryRepository,
  ) {}

  async getWatches(watchSN: string) {
    console.log(watchSN);

    if (!watchSN) {
      const watches = this.watchRepository.find({
        order: {
          no: 'DESC',
        },
      });
      return watches;
    }
    const watch = this.watchRepository.findOne({ watchSN });
    return watch;
  }

  async createWatch(watchDto: WatchDto) {
    const { watchSN, hardVer, firmVer, watchMemo } = watchDto;

    const status = 'available';
    const watch = this.watchRepository.create({
      watchSN,
      hardVer,
      firmVer,
      status,
      watchMemo,
    });

    try {
      await this.watchRepository.save(watch);
      return watch;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateWatch(watchDto: WatchDto) {
    const { watchSN, hardVer, firmVer, userNo, status, watchMemo } = watchDto;
    const watch = await this.watchRepository.findOne({ watchSN });

    hardVer ? (watch.hardVer = hardVer) : null;
    firmVer ? (watch.firmVer = firmVer) : null;
    userNo ? (watch.userNo = userNo) : null;
    status ? (watch.status = status) : null;
    watchMemo ? (watch.watchMemo = watchMemo) : null;

    await this.watchRepository.save(watch);
    return watch;
  }

  async deleteWatch(watchSN: string) {
    try {
      const result = this.watchRepository.delete({ watchSN });
    } catch (error) {
      return error;
    }
  }

  async updateUser(watchSN: string, userNo: string) {
    if (userNo) {
      const result = await this.watchRepository.update(
        {
          watchSN,
        },
        {
          userNo,
        },
      );
      return result;
    }
    try {
      const result = await this.watchRepository.update(
        {
          watchSN,
        },
        {
          userNo: null,
        },
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(dto: WatchHistoryDto) {
    const { watchSN, status, memo } = dto;

    const history = await this.watchHistoryRepository.create({
      watchSN,
      status,
      memo,
    });

    await this.watchHistoryRepository.save(history);

    await this.watchRepository.update(
      {
        watchSN,
      },
      {
        status,
      },
    );

    return history;
  }
}
