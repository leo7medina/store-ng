import {
  afterNextRender,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LocationService } from '@shared/services/location-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export default class Locations {
  locationService = inject(LocationService);
  $origin = signal('');

  constructor() {
    afterNextRender(() => {
      console.log('afterNextRender');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position: ', position);
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.$origin.set(origin);
      });
    });
  }

  locationsRs = rxResource({
    params: () => ({ origin: this.$origin() }),
    stream: ({ params }) =>
      this.locationService.getLocationsByOriginObs(params),
  });
}
