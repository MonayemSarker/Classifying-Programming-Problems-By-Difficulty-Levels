import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { shuffleArray } from "utility/utility";

@Injectable()
export class SurveyDetailService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createSurveyDetails(surveyParticipantsId: string, problems: any[]) {

        if (problems.length < 2) {
            throw new Error("Not enough problems to create pairs.");
        }

        const shuffledProblems = await shuffleArray([...problems]);

        const numberOfPairs = Math.min(parseInt(process.env.NUMBER_OF_PAIRS, 10), Math.floor(shuffledProblems.length / 2));

        for (let i = 0; i < numberOfPairs * 2; i += 2) {
            const problem1 = shuffledProblems[i];
            const problem2 = shuffledProblems[i + 1];

            await this.prisma.surveyDetails.create({
                data: {
                    surveyParticipants_id: surveyParticipantsId,
                    problem_1_id: problem1.id,
                    problem_2_id: problem2.id
                },
            });
        }
    }
}

