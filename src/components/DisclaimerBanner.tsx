import { useState, useEffect } from "react";
import { AlertTriangle, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "uae-tt-disclaimer-seen";

const DisclaimerBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleAccept(); }}>
      <DialogContent className="max-w-lg border-primary/20 bg-card">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl text-foreground">Important Disclaimer</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-muted-foreground leading-relaxed space-y-3 pt-2">
          <p className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <span>This website is for <strong className="text-foreground">educational and research purposes only</strong>.</span>
          </p>
          <p>All data is sourced exclusively from publicly available news reports and open-source databases.</p>
          <p>This is <strong className="text-foreground">not a real-time monitoring tool</strong> and is not affiliated with any government or military body.</p>
        </DialogDescription>
        <Button onClick={handleAccept} className="w-full mt-4">
          I Understand — Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerBanner;
