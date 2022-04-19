import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Jury, Member } from './jury.dto';
import { JuryService } from './jury.service';

class LoginPayload {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

@Controller('jury')
@ApiTags('Jurys')
export class JuryController {
  constructor(private readonly juryService: JuryService) {}

  @Post('exam/:exam')
  async create(@Param('exam') exam: string) {
    return await this.juryService.createJury(exam);
  }

  @Get('exam/:exam')
  async all(@Param('exam') exam: string) {
    return await this.juryService.find({ exam, enabled: true });
  }

  @Get('members-jury/:jury')
  async getJuryMembers(@Param('jury') jury: string) {
    return await this.juryService.getJuryMembers(jury);
  }

  @Get('members-exam/:exam')
  async getExamMembers(@Param('exam') exam: string) {
    return await this.juryService.members(exam);
  }

  @Post('create-member')
  async createMember(@Body() member: Member) {
    return await this.juryService.createMember(member);
  }

  @Put('update-member/:id')
  async updateMember(@Param('id') id: string, @Body() member: Member) {
    return await this.juryService.updateMember(id, member);
  }

  @Post('login')
  async login(@Body() member: LoginPayload) {
    return await this.juryService.login(member.username, member.password);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.juryService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }

  @Post('archive-members')
  async archiveMembersMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.juryService.archiveMember(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }

  @Get('pick-candidate/:dep/:jury/:num')
  async pickCandidate(
    @Param('dep') dep: string,
    @Param('jury') jury: string,
    @Param('num') num: string,
  ) {
    return this.juryService.pickCandidate(num, dep, jury);
  }
}
