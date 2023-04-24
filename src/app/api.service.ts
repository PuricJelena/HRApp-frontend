import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://localhost:8083";

  constructor(private http: HttpClient) { }

  getAuthoHeader() : any {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    }
    return{
      headers: headers
    };
}

getCandidates() {
  return this.http.get(this.baseURL + "/api/candidate/candidates", this.getAuthoHeader());
}


loadOneCandidate(id: any){
  return this.http.get(this.baseURL + "/api/candidate/" + id,this.getAuthoHeader());
}

addNewCandidate(data: any){
  return this.http.post(this.baseURL + "/api/candidate/addCandidate", data, this.getAuthoHeader());
}

editCandidate(id: number, data: any) {
  return this.http.put(this.baseURL + "/api/candidate/" +id, data, this.getAuthoHeader());
}

editJobCandidateSkill(id: number, data: any) {
  return this.http.put(this.baseURL + "/api/jobCandidate/" +id, data, this.getAuthoHeader());
}

deleteCandidate(id: number) {
  return this.http.delete(this.baseURL + "/api/candidate/" + id, this.getAuthoHeader())
}

searchCandidates(data: any){
  return this.http.post(this.baseURL + "/api/candidate/searchCandidates", data, this.getAuthoHeader());
}

getSkills() {
  return this.http.get(this.baseURL + "/api/skill/skills", this.getAuthoHeader());
}


loadOneSkill(id: any){
  return this.http.get(this.baseURL + "/api/skill/" + id,this.getAuthoHeader());
}



addNewSkill(data: any){
  return this.http.post(this.baseURL + "/api/skill/addSkill", data, this.getAuthoHeader());
}


deleteSkill(id: number) {
  return this.http.delete(this.baseURL + "/api/skill/" + id, this.getAuthoHeader())
}

searchSkills(data: any){
  return this.http.post(this.baseURL + "/api/skill/searchSkills", data, this.getAuthoHeader());
}

getJobCandidates() {
  return this.http.get(this.baseURL + "/api/jobCandidate/skills", this.getAuthoHeader());
}


getActiveJobCandidates() {
  return this.http.get(this.baseURL + "/api/jobCandidate/activeCandidates", this.getAuthoHeader());
}


loadOneJobCandidate(id: any){
  return this.http.get(this.baseURL + "/api/jobCandidate/" + id,this.getAuthoHeader());
}


getJobCandidateSkills(id: any) {
  return this.http.get(this.baseURL + "/api/jobCandidate/candidateSkills/" + id, this.getAuthoHeader());
}


addJobCandidateSkill(data: any){
  return this.http.post(this.baseURL + "/api/jobCandidate/addCandidateSkill", data, this.getAuthoHeader());
}

deleteJobSkill(id: number) {
  return this.http.delete(this.baseURL + "/api/jobCandidate/" + id, this.getAuthoHeader())
}

searchJobSkills(data: any){
  return this.http.post(this.baseURL + "/api/jobCandidate/searchJobSkills", data, this.getAuthoHeader());
}

}