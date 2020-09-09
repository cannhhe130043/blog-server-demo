import { Controller, Get, Request, Response } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  home(@Request() req, @Response() res) {
    return res.send('Hello Stranger')
  }
}
