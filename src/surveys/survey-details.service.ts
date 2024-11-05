import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { shuffleArray } from "utility/utility";
import { UpdateDifficultyDto } from "./dto/update-difficulty.dto";

@Injectable()
export class SurveyDetailService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createSurveyDetails(surveyParticipantsId: string, problems: any[]) {
        const desiredPairs = 20;

        // Shuffle the array to ensure randomness in the pairing
        const shuffledProblems = await shuffleArray([...problems]);

        const pairs = new Set<string>();
        let pairCount = 0;

        while (pairCount < desiredPairs) {
            // Randomly select two different problems from the list
            const problem1 = shuffledProblems[Math.floor(Math.random() * shuffledProblems.length)];
            const problem2 = shuffledProblems[Math.floor(Math.random() * shuffledProblems.length)];

            // Ensure the problems are different and create a unique key to avoid duplicate pairs
            if (problem1.id !== problem2.id) {
                const pairKey = [problem1.id, problem2.id].sort().join("-");

                if (!pairs.has(pairKey)) {
                    pairs.add(pairKey);

                    // Create the survey detail record
                    await this.prisma.surveyDetails.create({
                        data: {
                            surveyParticipants_id: surveyParticipantsId,
                            problem_1_id: problem1.id,
                            problem_2_id: problem2.id
                        },
                    });

                    pairCount++;
                }
            }
        }
    }

    async updateDifficulty(updateDifficultyDto: UpdateDifficultyDto) {
        const { pairId, difficultProblemId } = updateDifficultyDto;

        // Check if the pair exists
        const pair = await this.prisma.surveyDetails.findUnique({
            where: { id: pairId },
        });

        if (!pair) {
            throw new NotFoundException(`Pair with ID ${pairId} not found.`);
        }

        // Update the difficulty for the specified problem in the pair
        return await this.prisma.surveyDetails.update({
            where: { id: pairId },
            data: {
                difficult_problem_id: difficultProblemId
            },
        });
    }

}

