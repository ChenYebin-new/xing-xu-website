import housing from "../assets/product-imagery/housing-detail.png";
import inlet from "../assets/product-imagery/inlet-detail.png";
import drive from "../assets/product-imagery/drive-detail.png";
import assembly from "../assets/product-imagery/assembly-detail.png";

export const productDetails = [
  { image: housing, alt: "Green scroll housing with a red outlet", label: "Scroll Housing", detail: "Housing and outlet arrangement" },
  { image: inlet, alt: "Close-up of a red bellmouth inlet and bolted flange", label: "Inlet & Impeller", detail: "Inlet and flange detail" },
  { image: drive, alt: "Blue-grey motor and enclosed belt guard", label: "Motor & Drive", detail: "Motor and drive arrangement" },
  { image: assembly, alt: "Rear view of a centrifugal fan on a common steel base", label: "Complete Assembly", detail: "Base and mounting arrangement" },
] as const;
