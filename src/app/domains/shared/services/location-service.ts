import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '@env/environment';
import { Location } from '@shared/models/location';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);

  getLocationsByOriginObs(request: {
    origin?: string;
  }): Observable<Location[]> {
    const url = new URL(`${environment.apiUrl}/api/v1/locations`);
    if (request && request.origin) {
      url.searchParams.set('origin', request.origin);
    }
    return this.http.get<Location[]>(url.toString());
  }
}
