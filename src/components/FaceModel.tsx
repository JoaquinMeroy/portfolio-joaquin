import { Component, lazy, Suspense, type ReactNode } from "react";

// three.js is only downloaded when the 3D window is opened.
const ModelViewer = lazy(() => import("./bento/ModelViewer"));

class Boundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function FaceModel({ url }: { url: string }) {
  return (
    <Boundary
      fallback={
        <p role="alert" className="text-muted">
          Could not load the 3D model. Check that <code>{url}</code> exists in
          the public folder.
        </p>
      }
    >
      <Suspense
        fallback={
          <div
            className="grid h-[420px] place-items-center text-muted"
            role="status"
          >
            Loading 3D model…
          </div>
        }
      >
        <ModelViewer
          url={url}
          width="100%"
          height="min(70vh, 560px)"
          fit={1.15}
          autoRotate
          environment="studio"
        />
      </Suspense>
    </Boundary>
  );
}
