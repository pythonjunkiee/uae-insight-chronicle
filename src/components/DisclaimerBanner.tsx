import { AlertTriangle } from "lucide-react";

const DisclaimerBanner = () => (
  <div className="w-full bg-primary/10 border-b border-primary/20 px-4 py-2">
    <div className="container mx-auto flex items-center gap-2 text-xs sm:text-sm text-primary">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <p>
        <span className="font-semibold">Disclaimer:</span> This website is for educational and research purposes only. All data is sourced exclusively from publicly available news reports and open-source databases. This is not a real-time monitoring tool.
      </p>
    </div>
  </div>
);

export default DisclaimerBanner;
