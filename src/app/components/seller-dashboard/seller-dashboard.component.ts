import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auction } from '../../models/auction/auction.module';
import { AuctionService } from '../../service/auction.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent implements OnInit {

  auctions: Auction[] = [];

  newAuction: any = {
    id: null,
    name: null,
    description: null,
    startingBid: null,
    currentBid: null,
    bidHistory: [],
    sellerId: null,
    isFinalized: false,
    status: false
  };

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAuctions();
  }


  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe((data) => {
      this.auctions = data;
    });
  }

  createAuction(auctionForm: NgForm) {
    // Set additional auction fields
    this.newAuction.currentBid = this.newAuction.startingBid;
    this.newAuction.status = 'active'; // Set auction status as active

    // Generate a unique auction ID (you could use a better approach in a real scenario)
    this.newAuction.id = this.auctions.length + 1;

    // Add the new auction to the list (and optionally send it to the backend)
    this.auctions.push({ ...this.newAuction });

    // Optionally, you can reset the form
    this.resetForm();
    auctionForm.resetForm();

    this.toastr.success('Auction created successfully!', 'Success');
  }

  resetForm() {
    this.newAuction = {
      id: null,
      name: null,
      description: null,
      startingBid: null,
      currentBid: null,
      bidHistory: [],
      sellerId: null,
      isFinalized: false,
      status: false
    };
  }

  finalizeAuction(auction: Auction): void {
    this.auctionService.finalizeAuction(auction.id).subscribe(() => {
      this.auctions = this.auctions.filter(a => a.id !== auction.id);
    });
  }

  // cancelAuction(auction: any) {
  //   this.auctionService.cancelAuction(auction).subscribe(() => {
  //     this.auctions = this.auctions.filter(a => a.id !== auction.id);
  //     console.log(this.auctions);
  //   });
  // }

  cancelAuction(auction: any) {
    this.auctionService.cancelAuction(auction).subscribe(
      response => {
        console.log('Auction deleted successfully', response);
        // You can refresh your auction list here or show a success message
      },
      error => {
        console.error('Error deleting auction', error);
        // Handle error
      }
    );
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
