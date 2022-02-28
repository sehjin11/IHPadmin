import { WatchHistoryDto } from './dto/watch_history.dto';
import {
  ApiCookieAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WatchDto } from './dto/watch.dto';

@ApiTags('Product')
@ApiCookieAuth('jwt')
@Controller('product')
@UseGuards(AuthGuard('jwt2'))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/watch')
  @ApiOperation({
    summary: '워치 등록',
    description: '인핸드워치 신규 등록',
  })
  createWatch(@Body() watchDto: WatchDto) {
    console.log('createWatch');
    return this.productService.createWatch(watchDto);
  }

  @Get('/watch')
  @ApiOperation({
    summary: '워치 정보',
    description: 'watchSN 없으면 전체 워치, 있으면 해당 워치 정보 가져오기',
  })
  getWatches(@Query('watchSN') watchSN: string) {
    return this.productService.getWatches(watchSN);
  }

  @Patch('/watch')
  @ApiOperation({
    summary: '워치 수정',
    description: '워치 정보 수정',
  })
  updateWatch(@Body() watchDto: WatchDto) {
    return this.productService.updateWatch(watchDto);
  }

  @Delete('/watch')
  deleteWatch(@Query('watchSN') watchSN) {
    return this.productService.deleteWatch(watchSN);
  }

  @Patch('/watch/updateUser')
  @ApiOperation({
    summary: '워치 반환',
    description: '해당 워치에 userNo를 리셋한다',
  })
  resetUserNo(
    @Body('watchSN') watchSN: string,
    @Body('userNo') userNo: string,
  ) {
    return this.productService.updateUser(watchSN, userNo);
  }

  @Post('/watch/updateStatus')
  updateStatus(@Body() dto: WatchHistoryDto) {
    return this.productService.updateStatus(dto);
  }

  @Post('/ble')
  createBle() {}
}
