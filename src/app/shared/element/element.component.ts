import { Component, Inject, OnInit } from '@angular/core';
import { cadastroTask } from 'src/app/views/home/home.component';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit  {

  public cadastroForm: FormGroup = this.formBuilder.group({
    nome: this.data.nome,
    sobrenome: this.data.sobrenome, 
    email: this.data.email,
    telefone: this.data.telefone,
    endereco: this.data.endereco
  });




  element!: cadastroTask;

  constructor(
    public dialogRef: MatDialogRef<ElementComponent>,
 
    @Inject(MAT_DIALOG_DATA) public data: cadastroTask,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(): void {
   
  }
  public submitForm(value: any){
    this.dialogRef.close(value.value);
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}

