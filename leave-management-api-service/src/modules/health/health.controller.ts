import { Controller, Get, HttpStatus } from "@nestjs/common";
import { HealthService } from "./health.service";
import { ApiTags } from "@nestjs/swagger";
import { ResponseUtilService } from "src/shared/utils/response.util";

@ApiTags('Health Check')
@Controller() 
export class HealthController {
    constructor(
        private readonly healthService: HealthService
    ){}

    @Get('')
    async health() {
        try {
            const result = await this.healthService.health()
            return ResponseUtilService.ResponseWrapper({ status: HttpStatus.OK, data: result, error: null })
        } catch (error) {           
            return ResponseUtilService.ResponseWrapperWithErrorData({status: HttpStatus.INTERNAL_SERVER_ERROR, error: error.message, data: JSON.stringify(error)})
        }
    }
}