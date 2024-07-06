import { Injectable } from "@nestjs/common";


@Injectable()
export class HealthService {

    async health() {
        return {
            message: "Hello world"
        }
    }
}
