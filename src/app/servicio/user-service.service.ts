import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getUser(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/users?email=${email}&password=${password}`;
    return this.http.get<any>(url);
  }
  getmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/user-by-email?email=${email}}`;
    return this.http.get<any>(url);
  }

  getinfous(id: string): Observable<any> {
    const url = `${this.baseUrl}/usersget?idu=${id}`;
    return this.http.get<any>(url);
  }

  createUser(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/create", JSON.stringify(data), { headers: headers });
  }

  createEvent(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/create_event", JSON.stringify(data), { headers: headers });
  }
  createTicket(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/Tickets_Create", JSON.stringify(data), { headers: headers });
  }

  createUs(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/createUs", JSON.stringify(data), { headers: headers });
  }

  verifyEmail(email:string): Observable<any> {
    const url = `${this.baseUrl}/users/exists?email=${email}`;
    return this.http.get<any>(url);
  }
  deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/usersd?id=${id}`;
    return this.http.delete<any>(url);
  }
  updateUser(user_id: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/usersUpdate?id=${user_id}`;
    return this.http.put<any>(url, data);
  }

  getUserByRole(role: string): Observable<any> {
    const url = `${this.baseUrl}/usersr?role=${role}`;
    return this.http.get<any>(url);
  }
  getEvents(): Observable<any[]> {
    const url = `${this.baseUrl}/Events`;
    return this.http.get<any[]>(url);
  }

  getEventbyCate(categoria:string): Observable<any[]> {
    const url = `${this.baseUrl}/Events_Category?categoria=${categoria}`;
    return this.http.get<any[]>(url);
  }

  getTicketAvalibity(disponible: string): Observable<any> {
    const url = `${this.baseUrl}/Tickets_Avalibity?disponible=${disponible}`;
    return this.http.get<any>(url);
  }

  getTicketEvent(id_event: string): Observable<any> {
    const url = `${this.baseUrl}/TicketsE?id_event=${id_event}`;
    return this.http.get<any>(url);
  }

  getTicketID(_id: string): Observable<any> {
    const url = `${this.baseUrl}/Tickets?_id=${_id}`;
    return this.http.get<any>(url);
  }
  getUserCart(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Cart_user?userID=${userID}`;
    return this.http.get<any>(url);
  }
  getTicket_user(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Ticket_user?userID=${userID}`;
    return this.http.get<any>(url);
  }

  getUserinfo(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Userinfo?userID=${userID}`;
    return this.http.get<any>(url);
  }

  updateUserInfo(userID: string, userData: any): Observable<any> {
    const url = `${this.baseUrl}/Userinfo?userID=${userID}`;
    return this.http.put<any>(url, userData);
  }

  getEventID(id_event: string): Observable<any> {
    const url = `${this.baseUrl}/EventsID?id_event=${id_event}`;
    return this.http.get<any>(url);
  }
  createCart(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/Cart", JSON.stringify(data), { headers: headers });
  }
  deleteCart(userID:string): Observable<any> {
    const url = `${this.baseUrl}/Cart?userID=${userID}`;
    return this.http.delete<any>(url);
  }

  updateTicketDis(data: any): Observable<any> {
    const url = `${this.baseUrl}/Tickets_Ava`;
    return this.http.put<any>(url, data);
  }

  createuserTicketsave(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/createT_U", JSON.stringify(data), { headers: headers });
  }
}
