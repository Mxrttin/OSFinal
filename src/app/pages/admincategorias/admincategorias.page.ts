import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admincategorias',
  templateUrl: './admincategorias.page.html',
  styleUrls: ['./admincategorias.page.scss'],
})
export class AdmincategoriasPage implements OnInit {
  arregloCategoria!:any;

  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchCategoria().subscribe(res=>{
          this.arregloCategoria = res
        })
      }
    })
  }

}
