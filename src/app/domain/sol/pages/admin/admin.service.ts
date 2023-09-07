import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/admin/admin.model';
import { ApiService } from 'src/app/shared/services/api/api.service';
@Injectable({
  providedIn: 'root',
})
export class AdminService extends ApiService {
  getUsers(): Observable<User[]> {
    return this.get<User[]>(`users`);
  }
}
