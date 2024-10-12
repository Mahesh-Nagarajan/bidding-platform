import { Bid } from "../bid/bid.module";

export interface Auction {
  id: number;
  name: string;
  description: string;
  startingBid: number;
  currentBid: number;
  bidHistory: Bid[];
  sellerId: number;
  isFinalized: boolean;
  status: String;
}
