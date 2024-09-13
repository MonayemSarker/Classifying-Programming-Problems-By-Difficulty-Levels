import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantsService {

  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string) {
    return this.prisma.participants.findUnique({
      where: { email: email }
    })
  }

  async create(createParticipantDto: CreateParticipantDto) {
    const participantExist = await this.findByEmail(createParticipantDto.email)

    if (participantExist) {
      throw new BadRequestException('Participant exist already');
    }

    return this.prisma.participants.create({
      data: createParticipantDto
    })
  }

  async bulkCreate(participants: any[]) {
    const results = await Promise.all(participants.map(async (participant) => {
      const participantExist = await this.findByEmail(participant.email)
      if (!participantExist) {
        return await this.prisma.participants.create({
          data: {
            email: participant.email,
            name: participant.name,
            designation: participant.designation,
            location: participant.location,
            institution: participant.institution
          },
        });
      }
      else {
        return "Already existing participant"
      }
    })
    );
    console.log(results);

    return results;
  }

  async findAll() {
    return this.prisma.participants.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        designation: true,
        location: true,
        institution: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.participants.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.participants.delete({
      where: { id },
    });
  }
}
