import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Game } from 'src/app/Game';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  @Output() onAddGame: EventEmitter<Game> = new EventEmitter();
  @Output() onEditGame: EventEmitter<Game> = new EventEmitter();
  addForm!: FormGroup;
  game: Game = {
    id: 0,
    name: '',
    price: 0,
    description: ''
  }
  showUpdateButton = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<AddFormComponent>, private gameService: GameService) {
    if(data !== null){
      this.game = {... data.game };
      this.showUpdateButton = true;
    }
    
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: new FormControl(this.game.name, 
        Validators.required
      ),
      price: new FormControl(this.game.price, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(9999.99)
      ]),
      description: new FormControl(this.game.description, 
        Validators.required
      )
    })
    this.addForm.valueChanges.subscribe();
  }

  get f(){
    return this.addForm.controls;
  }

  addGame(){
    this.game.name = this.addForm.value.name;
    this.game.price = this.addForm.value.price;
    this.game.description = this.addForm.value.description;

    this.gameService.addGame(this.game).subscribe(game => {
      alert("Game added successfully.");
      this.onAddGame.emit(game)
    },
      err => alert(err.message)
    );

    this.addForm.reset();
  }

  editGame(){
    this.game.name = this.addForm.value.name;
    this.game.price = this.addForm.value.price;
    this.game.description = this.addForm.value.description;

    this.gameService.editGame(this.game).subscribe(game => {
      alert("Game updated successfully.");
      this.onEditGame.emit(game)
    },
      err => alert(err.message)
    );
  }
}
