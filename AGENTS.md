# Architecture rules

- Store uploaded portfolio photographs as Lovable Assets pointers after lossless-content border trimming, with matching public WebP copies for portable external hosting; this preserves full client photographs and prevents missing images away from Lovable.
- Apply saved light/dark preferences through a shared root theme provider and semantic CSS tokens; this preserves the selected appearance across pages without changing photograph content.