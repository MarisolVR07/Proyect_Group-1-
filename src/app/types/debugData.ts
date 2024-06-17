export interface DebugMessage {
  content: string;
  type: "Error" | "Info" | "Warning" | "Success";
}
