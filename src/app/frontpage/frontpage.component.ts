import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  addCandidateBox: boolean = false;
  addSkillBox: boolean = false;
  

  constructor(private formBuilder: FormBuilder,
   private router: Router,
   private api: ApiService,
   private _snackBar: MatSnackBar ) { 

    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    
    })

    this.form1 = this.formBuilder.group({
      name: ['', Validators.required]     
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log('test')

    const firstname = this.form.get('firstname')?.value;
    const surname = this.form.get('surname')?.value;
    const birthday = this.form.get('birthday')?.value;
    const phone = this.form.get('phone')?.value;
    const email = this.form.get('email')?.value;
   


    let data = {
      firstname: firstname,
      surname: surname,
      birthday: birthday,
      phone: phone,
      email: email
    }

    this.api.addNewCandidate(data).subscribe((response: any) => {
        console.log(response)
        this._snackBar.open('You have successfully added new candidate.', 'Close', {duration: 100000});   
    });

   location.reload();
}

onConfirm() {

  console.log('test')

  const name = this.form1.get('name')?.value;
 
 


  let data = {
    name: name
  }
  this.api.addNewSkill(data).subscribe((response: any) => {
      console.log(response)
      this._snackBar.open('You have successfully added new candidate.', 'Close', {duration: 100000});   
  });

 location.reload();
}


}
