import { Routes } from "@nestjs/core";
import { HealthModule } from "./modules/health/health.module";
import { API_VERSION } from "./shared/constants/app.constants";


export const routes: Routes = [
    {
        path: "leaves/api/" + API_VERSION,
        children: [
            {
                path: "/health",
                module: HealthModule
            }
        ]
    }
]