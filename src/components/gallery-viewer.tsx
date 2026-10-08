import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export type GalleryPhoto = { asset: { url: string }; alt: string; width: number; height: number };
export type GallerySelection = { photos: GalleryPhoto[]; index: number };

export function GalleryViewer({ selection, onChange }: {
  selection: GallerySelection | null;
  onChange: (value: GallerySelection | null) => void;
}) {
  const photo = selection?.photos[selection.index];
  function move(offset: number) {
    if (!selection) return;
    onChange({ ...selection, index: (selection.index + offset + selection.photos.length) % selection.photos.length });
  }
  return (
    <Dialog open={Boolean(photo)} onOpenChange={(open) => { if (!open) onChange(null); }}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-4xl gap-3 rounded-lg p-3 pt-12 sm:p-5 sm:pt-12"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}>
        <DialogTitle className="sr-only">Ojuloge's Beauty portfolio</DialogTitle>
        <DialogDescription className="sr-only">{photo?.alt}</DialogDescription>
        {photo && <img src={photo.asset.url} alt={photo.alt} width={photo.width} height={photo.height}
          className="mx-auto block h-auto max-h-[72dvh] w-auto max-w-full object-contain" />}
        <div className="flex items-center justify-center gap-6 text-foreground">
          <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous photograph" title="Previous photograph"><ChevronLeft /></Button>
          <span className="min-w-14 text-center text-sm tabular-nums" aria-live="polite">{selection ? `${selection.index + 1} / ${selection.photos.length}` : ""}</span>
          <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Next photograph" title="Next photograph"><ChevronRight /></Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}