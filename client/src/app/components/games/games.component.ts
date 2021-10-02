import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/Game';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'description', 'options'];
  myControl = new FormControl();

  displayFn(subject: any){
    return subject ? subject.name : undefined;
  }

  games: Game[] = [];

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });
    this.myControl.valueChanges.subscribe(value => {
      if(value === ''){
        this.gameService.getGames().subscribe(games => this.games = games);
      }
      else
        this.gameService.searchGame(value.toLocaleLowerCase()).subscribe(games => this.games = games);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.onAddGame.subscribe(game => {
      const newGames = [... this.games ];
      newGames.push(game);
      this.games = newGames;
    });
  }

  openDialogForEdit(game_to_edit: Game): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '600px',
      data: {game: game_to_edit}
    });

    dialogRef.componentInstance.onEditGame.subscribe(game => {
      this.games = this.games.map(g => g.id === game.id ? game : g);
    });
  }

  onDelete(game: Game){
    this.gameService.deleteGame(game).subscribe(
      () => this.games=this.games.filter(g => g.id !== game.id),
      err => alert(err.message)
    );
  }

}
