import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AIRequest } from '../interfaces/cad/ai-request';
import { AIResponse } from '../interfaces/cad/ai-response';

const APIPREFIX_AI = `${environment.aiUrl}/ai`;

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  http = inject(HttpClient);

  agent(request: AIRequest): Observable<AIResponse> {
    console.log(request);
    return this.http.post<AIResponse>(
      `${APIPREFIX_AI}/agent`,
      request
    );
  }

  execute(request: AIRequest): Observable<AIResponse> {
    console.log(request);
    return this.http.post<AIResponse>(
      `${APIPREFIX_AI}/execute`,
      request
    );
  }

}