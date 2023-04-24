import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.css']
})
export class UpdateCandidateComponent implements OnInit {
  id: any;
  skillId: any;
  candidateId: any;
  jobCandidate: any;
  jobCandidates= [] as any;
  editCandidateBox: boolean = false;
  skills = [] as any;
  candidate: any;
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;

  constructor(    private formBuilder : FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private _snackBar: MatSnackBar  ) { 
      this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      }
    );
    this.form = this.formBuilder.group({
      firstname: [''],
      surname: [''],
      birthday: [''],
      phone: [''],
      email: ['']
    
    });

    this.form1 = this.formBuilder.group({
      skillId: ['']
     
    })
    this.form2 = this.formBuilder.group({
      skillId: ['']
     
    })
    }

  ngOnInit(): void {
    
      this.api.getJobCandidateSkills(this.id).subscribe((response:any) => {
        console.log(response); 
        this.jobCandidates = response;      
      });
      this.api.getSkills().subscribe((response:any) => {
        this.skills = response;      
      });

      this.api.loadOneCandidate(this.id).subscribe((response:any) => {
        console.log(response); 
        this.candidate = response; 
        
    this.form.setValue({
      firstname: this.candidate.firstname, 
      surname: this.candidate.surname, 
      birthday: this.candidate.birthday, 
      phone: this.candidate.phone, 
      email: this.candidate.email
    
    });     
      });

      this.api.loadOneJobCandidate(this.id).subscribe((response:any) => {
        console.log(response); 
        this.jobCandidate = response; 
        
    this.form2.setValue({
      skillId: this.jobCandidate.skillId
    
    });     
      });
    
  }

  onDelete(id: number) {
    this.api.deleteJobSkill(id).subscribe((response:any) => {
    
     this.jobCandidates = response;
     if(response == true){
     
      window.location.reload();
    } else if( response === false){
        alert("Can't delete")
    }
  });
  }

  onSave(){
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

    this.api.editCandidate(this.id,data).subscribe((response:any) => {
      this.candidate = response;
      if( response != null){
        alert("You have successfully edited candidate's informations.")
        location.reload();
      } else if(response == null){
        alert(" Can't edit.")
      }
  });
  }

  onSave1(id: number){
   
    const skillId = this.form2.get('skillId')?.value;
   
    

    let data = {
     
      skillId: skillId
    }

  this.api.editJobCandidateSkill(id,data).subscribe((response:any) => {
    this.jobCandidate = response;
    console.log();
    if( response != null){
      alert("You have successfully edited candidate's skill.")
      location.reload();
    } else if(response == null){
      alert(" Can't edit.")
    }
});
}

  onConfirm(candidateId: number) {
    const skillId = this.form1.get('skillId')?.value;
    

      const data = {
        skillId: skillId,
        candidateId: candidateId
      }
  
      this.api.addJobCandidateSkill(data).subscribe((response: any) => {
        console.log(response);
        if (response == null) {
          this._snackBar.open('You have successfully added skill to a candidate. ', 'Close', { duration: 100000 });
        }
        location.reload();
      });
    
  }

}
