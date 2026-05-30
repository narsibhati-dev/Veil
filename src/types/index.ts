export type Note = string;

export interface TxRecord {
  signature: string;
  type: "shield" | "withdraw";
  amount: number;
  timestamp: number;
}

export interface ProofData {
  proof: {
    a: string[];
    b: string[][];
    c: string[];
  };
  publicInputs: string[];
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
