import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-candidate',
  templateUrl: './job-candidate.component.html',
  styleUrls: ['./job-candidate.component.css']
})
export class JobCandidateComponent implements OnInit {
  jobCandidates = [] as any;
  form: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      searchTerm: ['']
     
    })
   }

  ngOnInit(): void {
    this.api.getActiveJobCandidates().subscribe((response:any) => {
      this.jobCandidates = response;      
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

  onSearch(){
    const searchTerm = this.form.get('searchTerm')?.value;
  
    let data = {
      searchTerm: searchTerm   
    }
  
    this.api.searchJobSkills(data).subscribe((response: any) => {
      console.log(response);
      this.jobCandidates = response;
    });
  }

}
