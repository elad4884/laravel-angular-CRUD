import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../Game';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = `${environment.apiUrl}/games`;

  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.httpClient.get<Game[]>(this.url);
  }

  deleteGame(game: Game): Observable<Game> {
    return this.httpClient.delete<Game>(`${this.url}/${game.id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>(this.url, game, httpOptions);
  }

  editGame(game: Game): Observable<Game>{
    return this.httpClient.put<Game>(`${this.url}/${game.id}`, game, httpOptions);
  }

  searchGame(name: string): Observable<Game[]>{
    return this.httpClient.get<Game[]>(`${this.url}/search/${name}`);
  }
}
