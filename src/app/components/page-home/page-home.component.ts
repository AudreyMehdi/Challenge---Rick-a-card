import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../character.service';
import { Character } from '../../Models/character';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent implements OnInit {
  characterToDisplay: Character[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.getAllCharacters().subscribe((data) => {
      console.log(data);
     
      

   
    });
  }

}
