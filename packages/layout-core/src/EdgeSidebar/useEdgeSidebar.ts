import { useLayoutCtx } from "../Root/Root";
import { useLooseSidebarCtx } from "./EdgeSidebar";
import { DrawerAnchor } from "./EdgeSidebarBuilder";

export const useEdgeSidebar = (options?: {
  anchor?: DrawerAnchor;
  display?: string;
}) => {
  const { anchor, display = "inline-flex" } = options ?? {};
  const sidebar = useLooseSidebarCtx();
  const { state, builder, ...triggers } = useLayoutCtx();
  if (!sidebar && !anchor) {
    throw new Error(
      'Missing "anchor" property because this component is rendered outside of <EdgeSidebar />'
    );
  }
  const sidebarAnchor = sidebar?.anchor ?? anchor!;
  const sidebarId = sidebar
    ? sidebar.id
    : (`${sidebarAnchor}EdgeSidebar` as const);
  const sidebarState = state[sidebarId];

  return {
    ...sidebarState,
    ...triggers,
    sxDisplay: builder[sidebarId]?.getSxDisplay(display),
  };
};
