export type Note = string;

export interface TxRecord {
  signature: string;
  type: "shield" | "withdraw";
  amount: number;
  timestamp: number;
}

export interface ProofData {
  signature: string;
  amountLamports: number;
  feeLamports: number;
  recipient: string;
  isPartial: boolean;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
