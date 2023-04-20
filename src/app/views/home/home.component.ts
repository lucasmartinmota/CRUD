import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ElementComponent } from 'src/app/shared/element/element.component';

export interface cadastroTask {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: number;
  endereco: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'telefone', 'endereco', 'acao'];
  dataSource: cadastroTask[] = [];

  constructor(public dialog: MatDialog, private database: LocalStorageService) {
    this.dataSource = this.database.getAllData();
  }

  openDialog(element?: cadastroTask, index?: number): void{
    const dialogRef = this.dialog.open(ElementComponent, {
      data: !element?
      {nome: null, sobrenome: null, email: null, telefone: null, endereco: null
      } : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined && index === undefined) {
        this.database.create(result);
      } else if (result !== undefined && index !== undefined) {
        this.database.update(result, index);
      }

      this.dataSource = this.database.getAllData();
      this.table.renderRows();
    });
  }

  delete(index: number): void {
    this.database.delete(index);
    this.dataSource = this.database.getAllData();
    this.table.renderRows();
  }
}