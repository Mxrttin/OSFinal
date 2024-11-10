import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-infousuario',
  templateUrl: './infousuario.page.html',
  styleUrls: ['./infousuario.page.scss'],
})
export class InfousuarioPage implements OnInit {
  usuarioRecibido : any;

  constructor(private db: DbService, private router: Router, private activedroute: ActivatedRoute) { 
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
      }
    })
  }

  ngOnInit() {
  }

}
