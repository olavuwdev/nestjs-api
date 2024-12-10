import { Injectable } from '@nestjs/common';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
    constructor(
        private googleMapsClient: GoogleMapsClient,
        private configService: ConfigService
    ) {}
    getDirections(originId: string, destinationId:string){
        
    }

}
