import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auction } from '../models/auction/auction.module';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  // Mock API URL
  private apiUrl = 'http://localhost:3000/auctions';

  constructor(private http: HttpClient) { }

  getAuctions() {
    return this.http.get<Auction[]>(this.apiUrl);
  }

  createAuction(auction: Auction): Observable<Auction> {
    return this.http.post<Auction>(this.apiUrl, auction);
  }

  updateAuction(auction: Auction): Observable<Auction> {
    return this.http.put<Auction>(`${this.apiUrl}/${auction.id}`, auction);
  }

  finalizeAuction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cancelAuction(auction: any): Observable<any> {
    let auctionId = auction.id;
    const url = `${this.apiUrl}/${auctionId}`;
    return this.http.delete(url);
  }

  placeBid(auctionId: number, bid: any): Observable<any> {
    const url = `${this.apiUrl}/${auctionId}`;
    return this.http.patch(url, { bids: bid });
  }

}
