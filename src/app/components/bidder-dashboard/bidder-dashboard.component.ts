import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auction } from '../../models/auction/auction.module';
import { AuctionService } from '../../service/auction.service';
import { Router } from '@angular/router';
import { Bid } from '../../models/bid/bid.module';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bidder-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bidder-dashboard.component.html',
  styleUrl: './bidder-dashboard.component.scss'
})
export class BidderDashboardComponent implements OnInit {

  auctions: Auction[] = [];
  bidHistory: Bid[] = [];
  userId: number = 1;  // Assuming this is the logged-in user's ID

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe((data) => {
      this.auctions = data;
      this.loadBidHistory();
    });
  }

  loadBidHistory(): void {
    // Reset bid history before loading
    this.bidHistory = [];

    // Filter the bids based on the user's ID (assuming each bid has a bidderId)
    this.auctions.forEach(auction => {
      auction.bidHistory.forEach(bid => {
        if (bid.bidderId) {
          this.bidHistory.push({
            bidderId: bid.bidderId,
            amount: auction.currentBid,  // Corrected from `bid.amount` to `bid.bidAmount`
            timestamp: new Date(bid.timestamp)
          });
        }
      });
    });
  }

  placeBid(auction: Auction): void {
    const bidAmount = auction.currentBid + 10; // Incrementing bid amount by 10
    this.auctionService.placeBid(auction.id, bidAmount).subscribe((updatedAuction) => {
      auction.currentBid = updatedAuction.currentBid;

      // Add the new bid to the bid history
      this.bidHistory.push({
        bidderId: this.userId,
        amount: bidAmount,
        timestamp: new Date() // Record the current time as the timestamp
      });

      this.toastr.success('Bid Placed successfully!', 'Success');
    });
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to logout?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/login']);
        this.toastr.success('Successfully logged out!', 'Logout');
      }
    });
  }
}
