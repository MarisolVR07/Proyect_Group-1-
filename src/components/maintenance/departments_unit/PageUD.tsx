import Principal from "./Principal";
import { DebugMessage } from "@/app/types/debugData";

interface PageUDProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const PageUD: React.FC<PageUDProps> = ({ onDebugMessage }) => {
  return <Principal onDebugMessage={onDebugMessage} />;
};

export default PageUD;
